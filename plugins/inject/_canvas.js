import html2canvas from 'html2canvas'
import fs from 'file-saver'

const CANVAS_OPTIONS = {
  allowTaint: true,
  useCORS: true,
}

export async function exportElementToImage(download_type, file_name, target_element) {
  let canvas = null
  try {
    canvas = await html2canvas(target_element, CANVAS_OPTIONS)
  } catch (e) {
    throw new Error('Error - not created canvas')
  }

  canvas.toBlob((blob) => {
    fs.saveAs(blob, `${file_name}.${download_type}`)
  })
}

export default (context, inject) => {
  inject('_canvas', {
    _exportElementToImage: exportElementToImage,
  })
}
