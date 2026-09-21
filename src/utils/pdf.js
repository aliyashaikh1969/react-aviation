// Turns a DOM element into a downloadable A4 PDF.
// html2canvas and jsPDF are large, so they are only loaded when someone actually downloads a ticket.
export const downloadElementAsPdf = async (element, filename, { multiPage = false, scale = 2 } = {}) => {
  const [{ default: html2canvas }, { default: JsPdf }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const canvas = await html2canvas(element, { scale, useCORS: true, backgroundColor: '#ffffff' })
  const image = canvas.toDataURL('image/png')

  const pdf = new JsPdf('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  if (multiPage) {
    // full-width image that continues onto extra pages
    const height = (canvas.height * pageWidth) / canvas.width
    let heightLeft = height
    pdf.addImage(image, 'PNG', 0, 0, pageWidth, height)
    heightLeft -= pageHeight
    while (heightLeft > 0) {
      pdf.addPage()
      pdf.addImage(image, 'PNG', 0, heightLeft - height, pageWidth, height)
      heightLeft -= pageHeight
    }
  } else {
    // shrink to fit a single page, centred
    const margin = 10
    let width = pageWidth - margin * 2
    let height = (canvas.height * width) / canvas.width
    if (height > pageHeight - margin * 2) {
      height = pageHeight - margin * 2
      width = (canvas.width * height) / canvas.height
    }
    pdf.addImage(image, 'PNG', (pageWidth - width) / 2, margin, width, height)
  }

  pdf.save(filename)
}
