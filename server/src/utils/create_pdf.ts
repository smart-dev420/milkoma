import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

interface InputType {
  fileName: string;
  input: any;
}

interface Cell {
  text: string;
  width?: number;
  align?: 'left' | 'center' | 'right'; // Specify alignment options
}

interface Table {
  headers: Cell[];
  rows: Cell[][];
}

const createTable = (doc: PDFKit.PDFDocument, table: Table, startX: number, startY: number, row_height = 25) => {
  const initialX = startX; // Preserve initialX to maintain the left alignment
  const padding = 5;
  const headerRowHeight = 25;
  let rowHeight = row_height;

  let currentY = startY;
  doc.fontSize(12);
  // Draw table headers
  table.headers.forEach((header, index) => {
    doc.fillColor('grey', 0.2); // Set the fill color to gray

    // Draw a filled rectangle as the header cell background
    doc.rect(startX, currentY, header.width || 100, headerRowHeight).fill();

    doc.strokeColor('black', 1.0); // Set the stroke color to black
    doc.lineWidth(1); // Set the line width

    // Draw the border of the header cell
    doc.rect(startX, currentY, header.width || 100, headerRowHeight).stroke();

    // Reset the fill color and continue with text drawing
    doc.fillColor('black', 1.0);
    doc.text(header.text, startX, currentY + 5, { width: header.width, align: header.align || 'center'});

    startX += header.width || 100;
  });

  // Move to the next row
  currentY += headerRowHeight;

  // Draw table rows
  table.rows.forEach(row => {
    startX = initialX; // Reset startX for each row
    row.forEach((cell, index) => {
      doc.rect(startX, currentY, cell.width || 100, rowHeight).stroke();
      doc.text(cell.text, startX, currentY + 5, { width: cell.width, align: cell.align || 'left' });
      startX += cell.width || 100;
    });
    currentY += rowHeight;
  });
};

const numberWithCommas = (num: number): string => {
  return num.toLocaleString('ja-JP');
};

export const CreatePdfDocument = ( fileName:string, input:any ): void => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const rootPath = path.dirname(require.main?.path as string);
  const receiptPath = path.join(rootPath, 'uploads/receipts');
  const assetsPath = path.join(rootPath, 'src/assets');

  const { name, price } = input;

  const doc = new PDFDocument({ size: 'A4' });
  const output = receiptPath + '/' + fileName;
  const writeStream = fs.createWriteStream(`${output}.pdf`);
  doc.pipe(writeStream);

  // Load the font
  const fontPath = path.join(assetsPath, 'fonts/GenEiKoburiMin4-R-2.ttf');
  doc.registerFont('Mplus', fontPath);

  // Set the font and text encoding
  doc.font('Mplus').fontSize(16);

  // Render the text
  doc.fontSize(22).text('領 収 書', 60, 100, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`${year}年   ${month}月   ${day}日`, { align: 'right' });
  doc.fontSize(12).text('〒000-0000', { align: 'left' });
  doc.fontSize(10).text('○○県○○市○○町○○', 60, 190, { align: 'left' });
  doc.fontSize(10).text('株式会社〇〇〇〇     御中', 60, 210, { align: 'left' });

  doc.fontSize(10).text('NeoPen株式会社', 330, 190, { align: 'left' });
  doc.fontSize(10).text('〒 460-0003', 330, 210, { align: 'left' });
  doc.fontSize(8).text('愛知県名古屋市中区錦1丁目 17番地13号 名興ビルディング 2階', 330, 230, { align: 'left' });
  doc.fontSize(10).text('TEL: (052)-990-2931', 330, 250, { align: 'left' });
  doc.fontSize(10).text('Email: info@neopen.co.jp', 330, 270, { align: 'left' });
  
  doc.fontSize(12).text('下記、正に領収いたしました。', 60, 300, { align: 'left' });

  // Create table
  const table: Table = {
    headers: [
      { text: '品 名', width: 230 , align: 'center'},
      { text: '数量', width: 60, align: 'center' },
      { text: '摘 要', width: 190, align: 'center' },
    ],
    rows: [
      [{ text: name, width: 230 , align: 'center' }, { text: '1', width: 60, align: 'center' }, { text: numberWithCommas(price) + ' 円', width: 190, align: 'center' }],
      ...Array.from({ length: 9 }, () => [
        { text: '', width: 230 },
        { text: '', width: 60 },
        { text: '', width: 190 },
      ]),
      // Add more rows as needed
    ],
  };

  createTable(doc, table, 60, 330);

  // Create table
  const table1: Table = {
    headers: [
      { text: '備 考', width: 480 , align: 'center'},
    ],
    rows: [
      [{ text: '', width: 480 , align: 'center' }],
      // Add more rows as needed
    ],
  };

  createTable(doc, table1, 60, 640, 80);
  // Finalize PDF file
  doc.end();
};
