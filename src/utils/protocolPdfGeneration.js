const docx = require('docx')
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

module.exports = (filledProtocol, evaluationTeamMemberNames, evaluateeName) => {
    const documentJson = JSON.parse(filledProtocol)
    const preparedDocumentStructure = []
    let sectionNumber = 1
    let subsectionNumber = 1
    preparedDocumentStructure.push(new docx.Paragraph({children: [new docx.TextRun({
        text: "Hospitowany prowadzący:",
        bold: true,
        underline: true,
        font: {
            name: 'Times New Roman',
        },
    })]}))
    preparedDocumentStructure.push(new docx.Paragraph(evaluateeName))
    preparedDocumentStructure.push(new docx.Paragraph(""))
    preparedDocumentStructure.push(new docx.Paragraph({children: [new docx.TextRun({
        text: "Zespół hospitujący:",
        bold: true,
        underline: true,
        font: {
            name: 'Times New Roman',
        },
    })]}))
    for (const member of evaluationTeamMemberNames){
        preparedDocumentStructure.push(new docx.Paragraph(member))
    }
    preparedDocumentStructure.push(new docx.Paragraph(""))
    for (const [section, content] of Object.entries(documentJson)) {
        const paragraphStructure = []
        paragraphStructure.push(
            new docx.TextRun({
                text: sectionNumber.toString(),
                bold: true,
                font: {
                    name: 'Times New Roman',
                },
            })
        )
        paragraphStructure.push(
            new docx.TextRun({
                text: ' ' + section,
                bold: true,
                underline: true,
                font: {
                    name: 'Times New Roman',
                },
            })
        )
        preparedDocumentStructure.push(
            new docx.Paragraph({ children: paragraphStructure })
        )
        let tableStructure = []
        let columnWidth = [66, 34]
        for (const question of content) {
            if (question.question_text) {
                if(columnWidth.length === 3 && tableStructure.length > 0){
                    preparedDocumentStructure.push(new docx.Table({
                        rows: tableStructure,
                        width: {
                            size: 100,
                            type: docx.WidthType.PERCENTAGE,
                        },
                        layout: docx.TableLayoutType.FIXED,
                        columnWidths: columnWidth
                    }))
                    preparedDocumentStructure.push(new docx.Paragraph(""))
                    tableStructure = []
                    columnWidth = [64, 34]
                }
                if (
                    question.question_type ===
                    'single choice with additional field'
                ) {
                    tableStructure.push(
                        ...generateRowsForQuestionWithAdditionalFields(
                            question,
                            sectionNumber,
                            subsectionNumber
                        )
                    )
                } else {
                    tableStructure.push(
                        ...generateRowsForRegularQuestions(
                            question,
                            sectionNumber,
                            subsectionNumber
                        )
                    )
                }
                subsectionNumber += 1
            } else {
                for (const [
                    subsectionName,
                    subsectionContent,
                ] of Object.entries(question)) {
                    preparedDocumentStructure.push(new docx.Table({
                        rows: tableStructure,
                        width: {
                            size: 100,
                            type: docx.WidthType.PERCENTAGE,
                        },
                        layout: docx.TableLayoutType.FIXED,
                        columnWidths: columnWidth
                    }))
                    preparedDocumentStructure.push(new docx.Paragraph(""))
                    tableStructure = []
                    columnWidth = [10, 56, 34]
                    preparedDocumentStructure.push(new docx.Paragraph(""))
                    let startMerge = docx.VerticalMergeType.RESTART
                    for (const subsectionQuestion of subsectionContent) {
                        if (
                            subsectionQuestion.question_type ===
                            'single choice with additional field'
                        ) {
                            tableStructure.push(
                                ...generateRowsForQuestionWithAdditionalFields(
                                    subsectionQuestion,
                                    sectionNumber,
                                    subsectionNumber,
                                    true,
                                    startMerge,
                                    subsectionName
                                )
                            )
                        } else {
                            tableStructure.push(
                                ...generateRowsForRegularQuestions(
                                    subsectionQuestion,
                                    sectionNumber,
                                    subsectionNumber,
                                    true,
                                    startMerge,
                                    subsectionName
                                )
                            )
                        }
                        subsectionNumber += 1
                        startMerge = docx.VerticalMergeType.CONTINUE
                    }
                }
            }
        }
        const tempTable = new docx.Table({
            rows: tableStructure,
            width: {
                size: 100,
                type: docx.WidthType.PERCENTAGE,
            },
            layout: docx.TableLayoutType.FIXED,
            columnWidths: columnWidth
        })
        preparedDocumentStructure.push(tempTable)
        preparedDocumentStructure.push(new docx.Paragraph(""))
        sectionNumber += 1
        subsectionNumber = 1
    }
    const doc = new docx.Document({
        sections: [
            {
                properties: {},
                children: preparedDocumentStructure,
            },
        ],
    })
    return saveDocumentToFile(doc)
}

async function saveDocumentToFile(doc) {
    const docBuff = await docx.Packer.toBuffer(doc)
    let pdfBuf = await libre.convertAsync(docBuff, '.pdf', undefined);
    return pdfBuf
}

function generateRowsForRegularQuestions(
    question,
    sectionNumber,
    subsectionNumber,
    isSubsection = false,
    startMerge = null,
    subsectionName = null
) {
    const cells = []
    if (isSubsection) {
        cells.push(
            new docx.TableCell({
                margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text:
                                    startMerge ===
                                    docx.VerticalMergeType.RESTART
                                        ? subsectionName
                                        : '',
                                    size: 23,
                                    bold: true
                            }),
                        ],
                        alignment: docx.AlignmentType.CENTER,
                    }),
                ],
                borders: {
                    top: {
                        style: docx.BorderStyle.NONE,
                        size: 0,
                        color: 'F3F3F3',
                    },
                    bottom: {
                        style: docx.BorderStyle.NONE,
                        size: 0,
                        color: 'F3F3F3',
                    },
                    left: {
                        style: docx.BorderStyle.NONE,
                        size: 0,
                        color: 'FFFFFF',
                    },
                    right: {
                        style: docx.BorderStyle.NONE,
                        size: 0,
                        color: 'FFFFFF',
                    },
                },
                textDirection: docx.TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                verticalMerge: startMerge,
                verticalAlign: docx.VerticalAlign.CENTER,
                shading: {
                    fill: "#FAFAFA"
                }
            })
        )
    }
    cells.push(
        new docx.TableCell({
            margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
            children: [
                new docx.Paragraph({
                    text:
                        sectionNumber.toString() +
                        '.' +
                        subsectionNumber.toString() +
                        ' ' +
                        question.question_text,
                }),
            ],
            borders: {
                top: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
                bottom: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
                left: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
                right: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
            },
        })
    )
    cells.push(
        new docx.TableCell({
            margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
            children: [
                new docx.Paragraph({
                    alignment: docx.AlignmentType.RIGHT,
                    children: [
                        new docx.TextRun({
                            text:
                                typeof question.answer == 'undefined'
                                    ? '---'
                                    : question.answer,
                            bold: true,
                        }),
                    ],
                }),
            ],
            borders: {
                top: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
                bottom: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
                left: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
                right: {
                    style: docx.BorderStyle.NONE,
                    size: 0,
                    color: 'FFFFFF',
                },
            },
        })
    )
    return [
        new docx.TableRow({
            children: cells,
            cantSplit: true,
        }),
    ]
}

function generateRowsForQuestionWithAdditionalFields(
    question,
    sectionNumber,
    subsectionNumber,
    isSubsection = false,
    startMerge = null,
    subsectionName = null
) {
    const rows = []
    let subquestionNumber = 1
    if (typeof question.answer === 'object') {
        for (const [subquestion, answer] of Object.entries(question.answer)) {
            const cells = []
            if (isSubsection) {
                cells.push(
                    new docx.TableCell({
                        margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
                        children: [
                            new docx.Paragraph({
                                children: [
                                    new docx.TextRun({
                                        text:
                                            startMerge ===
                                            docx.VerticalMergeType.RESTART
                                                ? subsectionName
                                                : '',
                                                size: 23,
                                                bold: true
                                                                                }),
                                ],
                                alignment: docx.AlignmentType.CENTER,
                            }),
                        ],
                        borders: {
                            top: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'F3F3F3',
                            },
                            bottom: {
                                style: docx.BorderStyle.NONE,
                                size: 1,
                                color: 'F3F3F3',
                            },
                            left: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            right: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                        },
                        textDirection:
                            docx.TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                        verticalMerge: startMerge,
                        verticalAlign: docx.VerticalAlign.CENTER,
                        shading: {
                            fill: "#FAFAFA"
                        }
                    })
                )
            }
            if (subquestion === 'answer') {
                cells.push(
                    new docx.TableCell({
                        margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
                        children: [
                            new docx.Paragraph({
                                text:
                                    sectionNumber.toString() +
                                    '.' +
                                    subsectionNumber.toString() +
                                    ' ' +
                                    question.question_text,
                            }),
                        ],
                        borders: {
                            top: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            bottom: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            left: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            right: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                        },
                    })
                )
                cells.push(
                    new docx.TableCell({
                        margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
                        children: [
                            new docx.Paragraph({
                                alignment: docx.AlignmentType.RIGHT,
                                children: [
                                    new docx.TextRun({
                                        text:
                                            typeof answer == 'undefined'
                                                ? '---'
                                                : answer,
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                        borders: {
                            top: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            bottom: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            left: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            right: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                        },
                    })
                )
            } else {
                cells.push(
                    new docx.TableCell({
                        margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
                        children: [
                            new docx.Paragraph({
                                text:
                                    sectionNumber.toString() +
                                    '.' +
                                    subsectionNumber.toString() +
                                    '.' +
                                    subquestionNumber.toString() +
                                    ' ' +
                                    subquestion,
                            }),
                        ],
                        borders: {
                            top: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            bottom: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            left: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            right: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                        },
                    })
                )
                cells.push(
                    new docx.TableCell({
                        margins: {marginUnitType: docx.WidthType.DXA, top: 50, bottom: 50},
                        children: [
                            new docx.Paragraph({
                                alignment: docx.AlignmentType.RIGHT,
                                children: [
                                    new docx.TextRun({
                                        text:
                                            typeof answer == 'undefined'
                                                ? '---'
                                                : answer,
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                        borders: {
                            top: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            bottom: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            left: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                            right: {
                                style: docx.BorderStyle.NONE,
                                size: 0,
                                color: 'FFFFFF',
                            },
                        },
                    })
                )
                subquestionNumber += 1
            }
            rows.push(
                new docx.TableRow({
                    children: cells,
                    cantSplit: true,
                })
            )
        }
    } else {
        return generateRowsForRegularQuestions(
            question,
            sectionNumber,
            subsectionNumber
        )
    }
    return rows
}
