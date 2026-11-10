import { INTAKE_LIMITS } from "@/lib/forms";

/**
 * Browser-side file preparation for the /99 intake. Photos are resized and re-encoded so a
 * logo plus five phone photos fit comfortably in one request (serverless hosts cap request
 * bodies at 4.5 MB). Returns { name, type, data } with base64 data, or throws a readable Error.
 */

function readAsDataURL(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("We could not read that file."));
    r.readAsDataURL(blob);
  });
}

function toBase64(dataUrl) {
  return dataUrl.slice(dataUrl.indexOf(",") + 1);
}

async function loadImage(file) {
  if ("createImageBitmap" in window) {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Fall through to <img> decoding (e.g. HEIC on browsers that cannot decode it).
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function encode(source, maxDim, type, quality) {
  const w = source.width;
  const h = source.height;
  const scale = Math.min(1, maxDim / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext("2d");
  if (type === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  if (!blob) throw new Error("We could not process that image. Please try a JPG or PNG.");
  return blob;
}

function baseName(name) {
  return name.replace(/\.[^.]+$/, "").slice(0, 80) || "file";
}

/**
 * @param {File} file
 * @param {"logo" | "photo"} kind
 */
export async function prepareFile(file, kind) {
  const max = INTAKE_LIMITS.maxFileBytes;

  // Vector logos and PDFs are sent as they are.
  if (file.type === "image/svg+xml" || file.type === "application/pdf") {
    if (file.size > max) throw new Error(`${file.name} is larger than ${Math.round(max / 1024)} KB. Please email it to us instead.`);
    return { name: file.name, type: file.type, data: toBase64(await readAsDataURL(file)) };
  }
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image. Please use JPG, PNG, WebP, SVG or PDF.`);

  const img = await loadImage(file);
  const attempts =
    kind === "logo"
      ? [
          [1400, "image/png", undefined],
          [1400, "image/webp", 0.92],
          [1000, "image/webp", 0.85],
        ]
      : [
          [1600, "image/jpeg", 0.8],
          [1280, "image/jpeg", 0.72],
          [1024, "image/jpeg", 0.65],
        ];

  for (const [dim, type, q] of attempts) {
    const blob = await encode(img, dim, type, q);
    if (blob.size <= max) {
      const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
      return { name: `${baseName(file.name)}.${ext}`, type, data: toBase64(await readAsDataURL(blob)) };
    }
  }
  throw new Error(`${file.name} is too large even after resizing. Please choose a smaller file.`);
}

export function fileBytes(f) {
  return f ? Math.floor((f.data.length * 3) / 4) : 0;
}
