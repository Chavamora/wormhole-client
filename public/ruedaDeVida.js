console.log('funcionando');
               const rueda_de_vida = new Chart(document.getElementById("ruedaDeVida"), {
                    "type": "radar",
                    "data": {
                        "labels": ['Crecimiento Personal', 'Negocios/Estudios', 'Familia', 'Salud', 'Amigos', 'Recreación/Diverción', 'Amor', 'Contribución', 'Finanzas', 'Espiritual'],
                        "datasets": [{
                            "label": "En este momento",
                           // "data": [65, 59, 90, 81, 56, 55, 40, 69, 73, 52],
                           "data": [],
                            "fill": true,
                            "backgroundColor": "rgb( 174, 214, 241, 0.2)",
                            "borderColor": "rgb( 174, 214, 241 )",
                            "pointBackgroundColor": "rgb( 174, 214, 241 )",
                            "pointBorderColor": "#fff",
                            "pointHoverBackgroundColor": "#fff",
                            "pointHoverBorderColor": "rgb( 174, 214, 241 )"
                        },
                        {
                            "label": "Mi meta",
                            "data": [],
                            "fill": true,
                            "backgroundColor": "rgb( 249, 231, 159, 0.2)",
                            "borderColor": "rgb( 249, 231, 159 )",
                            "pointBackgroundColor": "rgb( 249, 231, 159 )",
                            "pointBorderColor": "#fff",
                            "pointHoverBackgroundColor": "#fff",
                            "pointHoverBorderColor": "rgb( 249, 231, 159 )"
                        }]
                    },
                    "options": { "elements": { "line": { "tension": 0, "borderWidth": 3 } } }
                });
         