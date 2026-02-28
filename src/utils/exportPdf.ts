import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportFlowToPDF = async (elementId: string, filename: string = 'Strukturlegekarten.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found.`);
        return;
    }

    // Speichern des originalen Style, um später zurückzusetzen
    const originalStyle = element.style.cssText;

    try {
        // Für den Export fügen wir eine temporäre CSS-Klasse ein oder ändern den Style
        // um sicherzustellen, dass alles aufs Bild passt und Hintergründe richtig geladen werden
        element.style.background = '#1a1b26'; // Dark theme background

        const canvas = await html2canvas(element, {
            scale: 2, // Bessere Auflösung
            useCORS: true,
            backgroundColor: '#1a1b26',
            ignoreElements: (node) => {
                // Ignore UI elements like the React Flow controls or the download button
                return node.classList.contains('react-flow__controls') ||
                    node.classList.contains('react-flow__panel') ||
                    node.classList.contains('no-print');
            }
        });

        const imgData = canvas.toDataURL('image/png');

        // A4 Größe in mm
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Seitenverhältnis beibehalten
        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.width / imgProps.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;
        let marginX = 0;
        let marginY = 0;

        if (imgRatio > pdfRatio) {
            finalHeight = pdfWidth / imgRatio;
            marginY = (pdfHeight - finalHeight) / 2;
        } else {
            finalWidth = pdfHeight * imgRatio;
            marginX = (pdfWidth - finalWidth) / 2;
        }

        pdf.addImage(imgData, 'PNG', marginX, marginY, finalWidth, finalHeight);
        pdf.save(filename);

    } catch (error) {
        console.error('Fehler beim PDF Export:', error);
    } finally {
        // Reset styles
        element.style.cssText = originalStyle;
    }
};
