$(function () {
    let date = new Date();
    let strDate = 
            date.getFullYear()+"-"+leadingZero(date.getMonth()+1)+"-"+
            leadingZero(date.getDate());
    $.ajax({
        type: "get",
        url: "/api/coronaInfo/today",
        success: function (r) {
            console.log(r);
            $("#accExamCnt").html(r.data.strAccExamCnt);
            $("#decideCnt").html(r.data.strDecideCnt);
            let ctx2 = $("#confirmed_chart");
            let confirmed_chart = new Chart(ctx2, {
                type: "pie",
                options: {
                    responsive: false
                },
                data: {
                    labels: ["확진", "음성"],
                    datasets: [{
                        label: "확진/음성",
                        data: [r.data.decideCnt, r.data.examCnt - r.data.decideCnt],
                        backgroundColor: ["rgb(124, 214, 115)", "rgb(182, 238, 176)"]
                    }]
                }
            })
        }
    })
    $.ajax({
        type: "get",
        url: "/api/coronaSidoInfo/today",
        success: function (r) {
            console.log(r);
            let sidoName = new Array();
            let defCnt = new Array();
            
            for (let i = 0; i < 6; i++) {
                let tag = "<tbody class='region-tbody'></tbody>";
                $(".region_confirm_tbl").append(tag);
            }

            for (let i = 0; i < r.data.length; i++) {
                let sido = r.data[i].gubun;
                let cnt = r.data[i].incDec;

                sidoName.push(sido);
                defCnt.push(cnt);

                let page = Math.floor(i / 3);
                let tag =
                    '<tr>' +
                    '<td>' + r.data[i].gubun + '</td>' +
                    '<td>' + r.data[i].defCnt + '</td>' +
                    '<td>' + r.data[i].incDec + ' ▲</td>' +
                    '</tr>'
                $(".region-tbody").eq(page).append(tag);
            }
            $(".region-tbody").eq(0).addClass("active");

            $("#region_next").click(function () {
                let currentPage = Number($(".current").html());
                currentPage++;
                if (currentPage > 6) currentPage = 6;

                $(".current").html(currentPage);
                $(".region-tbody").removeClass("active");
                $(".region-tbody").eq(currentPage - 1).addClass("active");
            })

            $("#region_prev").click(function () {
                let currentPage = Number($(".current").html());
                currentPage--;
                if (currentPage < 1) currentPage = 1;

                $(".current").html(currentPage);
                $(".region-tbody").removeClass("active");
                $(".region-tbody").eq(currentPage - 1).addClass("active");
            })


            let ctx = $("#regional_status");
            let regionalChart = new Chart(ctx, {
                type: 'bar',
                options: {
                    responsive: false
                },
                data: {
                    labels: sidoName,
                    datasets: [{
                        label:strDate+" 신규확진",
                        // label: "2021-08-10 신규확진",
                        data: defCnt,
                        backgroundColor: ['rgb(203, 243, 227)']
                    }]
                }
            });
        }
    })

    // let ctx2 = $("#confirmed_chart");
    // let confirmed_chart = new Chart(ctx2, {
    //     type:"pie",
    //     options:{
    //         responsive:false
    //     },
    //     data:{
    //         labels:["확진", "음성"],
    //         datasets:[
    //             {
    //                 label:"확진/음성",
    //                 data:[100, 200],
    //                 backgroundColor:["rgb(124, 214, 115)", "rgb(182, 238, 176)"]
    //             }
    //         ]
    //     }
    // })
    $.ajax({
        type: "get",
        url: "/api/corona/vaccine/today",
        success: function (r) {
            console.log("백신정보");
            console.log(r);
            let regionArr = new Array();
            let firstArr = new Array();
            let secondArr = new Array();
    
            for (let i = 0; i < r.data.length; i++) {
                regionArr.push(r.data[i].region);
                firstArr.push(r.data[i].firstCnt);
                secondArr.push(r.data[i].secondCnt);
    
            }
            let ctx3 = $("#vaccine_chart");
            let vaccineChart = new Chart(ctx3, {
                type: 'bar',
                options: {
                    responsive: false,
                },
                data: {
                    labels: regionArr,
                    datasets: [{
                            label: strDate+" 1차 접종현황",
                            data: firstArr,
                            backgroundColor: ['rgb(118, 210, 192)']
                        },
                        {
                            label: strDate+" 2차 접종현황",
                            data: secondArr,
                            backgroundColor: ['rgb(69, 160, 142)']
                        }
                    ]
                }
            });
        }
    })
        $.ajax({
            type: "get",
            url: "/api/corona/gen/today",
            success: function (r) {
                console.log(r);
                let genName = new Array();
                let confirmed = new Array();
    
    
                for (let i = 0; i < r.data.length; i++) {
                    let gen = r.data[i].gubun;
                    let confirmedCnt = r.data[i].confCase;
    
    
                    genName.push(gen);
                    confirmed.push(confirmedCnt);
                }
            let ctx4 = $("#gen_confirm_status");
            let genChart = new Chart(ctx4, {
                type: 'pie',
                options: {
                    responsive: false
                },
                data: {
                    labels: genName,
                    datasets: [{
                        label: ["남성/여성"],
                        data: confirmed,
                        backgroundColor: ["rgb(139, 189, 255)", "rgb(235, 237, 255)"]
                    }]
                }
            })
            
        }
    });
    $.ajax({
        type: "get",
        url: "/api/corona/age/today",
        success: function (r) {
            console.log(r);
            let ageName = new Array();
            let confirmed = new Array();


            for (let i = 0; i < r.data.length; i++) {
                let age = r.data[i].gubun;
                let confirmedCnt = r.data[i].confCase;


                ageName.push(age);
                confirmed.push(confirmedCnt);
            }
            let ctx5 = $("#age_confirm_status");
            let ageChart = new Chart(ctx5, {
                type: 'bar',
                options: {
                    responsive: false
                },
                data: {
                    labels: ageName,
                    datasets: [{
                            label:strDate+" 연령별 누적 확진자 수",
                            data: confirmed,
                            backgroundColor: ['#87D0F2']
                        }
                    ]
                }
            })
        }
    });
    $.ajax({
        type: "get",
        url: "/api/corona/gen/today",
        success: function (r) {
            console.log(r);
            let genName = new Array();
            let death = new Array();


            for (let i = 0; i < r.data.length; i++) {
                let gen = r.data[i].gubun;
                let deathCnt = r.data[i].death


                genName.push(gen);
                death.push(deathCnt);
            }
        let ctx6 = $("#gen_death_status");
        let genChart = new Chart(ctx6, {
            type: 'pie',
            options: {
                responsive: false
            },
            data: {
                labels: genName,
                datasets: [{
                    label: ["남성/여성"],
                    data: death,
                    backgroundColor: ["rgb(237,149,149)", "rgb(250, 224, 212)"]
                }]
            }
        })
        
    }
});
$.ajax({
    type: "get",
    url: "/api/corona/age/today",
    success: function (r) {
        console.log(r);
        let ageName = new Array();
        let death = new Array();

        for (let i = 0; i < r.data.length; i++) {
            let age = r.data[i].gubun;
            let deathCnt = r.data[i].death

            ageName.push(age);
            death.push(deathCnt);
        }
        let ctx7 = $("#age_death_status");
        let ageChart = new Chart(ctx7, {
            type: 'bar',
            options: {
                responsive: false
            },
            data: {
                labels: ageName,
                datasets: [{
                        label:strDate+" 연령별 신규 사망자 수",
                        data: death,
                        backgroundColor: ['rgb(255, 153, 153)']
                    }
                ]
            }
        })
    }
});

function leadingZero(n) {
    return n<10?"0"+n:""+n;
}
})
