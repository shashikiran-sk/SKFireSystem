var express = require('express');
var router = express.Router();
var excel = require('exceljs');

router.get('/writeexcel',(req,res,next)=>{
    var workbook = new excel.Workbook();

    var worksheet = workbook.addWorksheet('Sample');

    var col=worksheet.getColumn('A');
    col.eachCell(function(cell, rowNumber) {
        if (rowNumber == 20) {
            cell.value='huiewhiufhf';
        }
    });
    worksheet.getCell('B2').value='Why?';

    workbook.xlsx.writeFile('SampleExcel.xlsx').then(()=>{
        res.send('Excel File Generated');
    })
    
})

module.exports = router;