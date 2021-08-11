$(function(){

    $.ajax({
        type:"get",
        url:"/api/coronaInfo/today",
        success:function(r) {
            console.log(r);
            $("#accExamCnt").html(r.data.strAccExamCnt);
            $("#decideCnt").html(r.data.strDecideCnt);
            let ctx2 = $("#confirmed_chart");
            let confirmed_chart = new Chart(ctx2, {
                type:"pie",
                options:{
                    responsive:false
                },
                data:{
                    labels:["확진", "음성"],
                    datasets:[
                        {
                            label:"확진/음성",
                            data:[r.data.decideCnt, r.data.examCnt - r.data.decideCnt],
                            backgroundColor:["rgb(124, 214, 115)", "rgb(182, 238, 176)"]
                        }
                    ]
                }
            })
        }
    })
    
    // $.ajax({
    //     type:"get",
    //     url:"/api/coronaSido/today",
    //     success:function(r) {
    //         console.log(r);
    //         $("#incDec").html(r.data.strIncDec);
            let ctx = $("#regional_status");
            let regionalChart = new Chart(ctx, {
                type:'bar',
                options:{
                    responsive:false
                },
                data:{
                    labels:['서울', '경기', '대구', '인천', '부산', '경남', '경북', '충남', '강원', '대전', '충북', '광주', '울산', '전북', '전남', '제주', '세종'],
                    datasets:[{
                        label:"2021-08-09 신규확진",
                        data:[415, 408, 86, 65, 123, 88, 30, 68, 24, 42, 39, 19, 25, 21, 14, 11, 1],
                        backgroundColor:['rgb(203, 243, 227)']
                    }]
                }
            });

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

    let ctx3 = $("#vaccine_chart");
    let vaccineChart = new Chart(ctx3, {
        type:'bar',
        options:{
            responsive:false
        },
        data:{
            labels:['서울', '경기', '대구', '인천', '부산', '경남', '경북', '충남', '강원', '대전', '충북', '광주', '울산', '전북', '전남', '제주', '세종'],
            datasets:[{
                label:"2021-08-09 1차 접종현황",
                data:[415, 408, 86, 65, 123, 88, 30, 68, 24, 42, 39, 19, 25, 21, 14, 11, 1],
                backgroundColor:['rgb(118, 210, 192)']
            },
            {
                label:"2021-08-09 2차 접종현황",
                data:[415, 408, 86, 65, 123, 88, 30, 68, 24, 42, 39, 19, 25, 21, 14, 11, 1],
                backgroundColor:['rgb(69, 160, 142)']
            }]
        }
    });
});
