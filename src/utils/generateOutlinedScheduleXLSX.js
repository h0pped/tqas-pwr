const ExcelJS = require('exceljs')

module.exports = (evaluations, numOfEvaluationsPerEvaluatee,) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'WIT Teaching Quality Assurance System';

    const worksheet = workbook.addWorksheet('Ramowy harmonogram hospitacji')

    worksheet.columns = [
        { header: 'Lp.', key: 'sNo', width: 5 },
        { header: 'Nazwa i kod kursu', key: 'course', width: 30 },
        { header: 'Tytuł/stopień naukowy,\nimię i nazwisko hospitowanego', key: 'evaluatee', width: 30, style: { font: { bold: true } } },
        { header: 'Liczba osób zapisanych na zajęcia dydaktyczne', key: 'numOfEnrolled', width: 15 },
        { header: 'Miejsce i termin zajęć dydaktycznych', key: 'placeAndTime', width: 35 },
        { header: 'Tytuł/stopień naukowy,\nimię i nazwisko członka zespołu hospitującego', key: 'evaluationTeam', width: 30 }
    ]

    const header = worksheet.getRow(1);
    header.height = 60;

    let currentlyEditingRow = 1;

    evaluations.forEach((evaluation) => {
        worksheet.addRow({
            course: `${evaluation.course.course_name}\n${evaluation.course.course_code}`,
            evaluatee: `${evaluation.evaluatee.user.academic_title} ${evaluation.evaluatee.user.first_name} ${evaluation.evaluatee.user.last_name}`,
            numOfEnrolled: evaluation.enrolled_students,
            placeAndTime: evaluation.details,
            evaluationTeam: evaluation.getDataValue('evaluation_team').map(function (member) {
                return `${member.getDataValue('user_full').academic_title} ${member.getDataValue('user_full').first_name} ${member.getDataValue('user_full').last_name}`
            }).join('\n')
        })

        worksheet.getRow(currentlyEditingRow + 1).eachCell({ includeEmpty: false }, function (cell) {
            cell.border = {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' }
            };
            cell.alignment = {
                wrapText: true,
                vertical: 'middle'
            };
            cell.font = {
                name: 'Times New Roman',
                size: 12
            }
        })

        currentlyEditingRow++;
    })

    let correntRowPosition = 2;
    Object.values(numOfEvaluationsPerEvaluatee).forEach((value) => {
        if (value > 1) {
            const rowPositionToMergeTo = correntRowPosition + value - 1;
            worksheet.mergeCells(`A${correntRowPosition}:A${rowPositionToMergeTo}`)
            worksheet.mergeCells(`C${correntRowPosition}:C${rowPositionToMergeTo}`)
            worksheet.mergeCells(`F${correntRowPosition}:F${rowPositionToMergeTo}`)

            correntRowPosition += value;
        } else {
            correntRowPosition += 1;
        }
    });


    const sNoCol = worksheet.getColumn('sNo');

    const rowRangesPerEvaluatees = []
    let lastVisitedCell = 1;

    Object.values(numOfEvaluationsPerEvaluatee).forEach((numOfEvaluations) => {
        const singleEvaluateeRowRange = []

        for (let i = 1; i < numOfEvaluations + 1; i++) {
            const currentCell = `A${i + lastVisitedCell}`;
            singleEvaluateeRowRange.push(currentCell);

            if (i === numOfEvaluations) {
                lastVisitedCell = lastVisitedCell + numOfEvaluations;
            }
        }

        rowRangesPerEvaluatees.push(singleEvaluateeRowRange);
    });

    let sNo = 0;
    rowRangesPerEvaluatees.forEach((row) => {
        sNo += 1;
        worksheet.getCell(row[0]).value = sNo
    });

    let rowNumber = 0;
    rowRangesPerEvaluatees.forEach((range) => {
        rowNumber += 1;
        if (rowNumber % 2 === 0) {
            range.forEach((cell) => {
                const currentRow = worksheet.getCell(cell).row

                worksheet.getRow(currentRow).eachCell(function (cell) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'efefef' },
                    };
                });

            });
        }
    });

    sNoCol.eachCell(function (cell) {
        cell.border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        cell.alignment = {
            wrapText: true,
            vertical: 'middle',
            horizontal: 'left'
        };
        cell.font = {
            name: 'Times New Roman',
            size: 12
        };
    });

    header.eachCell({ includeEmpty: false }, function (cell) {
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        cell.border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' },
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'c9c9c9' },
        };
        cell.font = { name: 'Times New Roman', size: 12, bold: true };
    });


    const evaluateeCol = worksheet.getColumn('evaluatee');
    evaluateeCol.eachCell(function (cell) {
        cell.font = { name: 'Times New Roman', size: 12, bold: true }
    });

    return workbook;
}