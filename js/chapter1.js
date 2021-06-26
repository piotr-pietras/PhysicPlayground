ballColors = [
    "red", "yellow", "green", "blue", "purple"
];

function chapter1Load() {
    $("#scene__simplePhysic").unbind()
    $("#scene__simplePhysic").click(function (e) { 
        e.preventDefault();
        //POSTITON X is not corrent due to scene width
        simplePhysic.addCircle(50, 
            e.clientX - 25, e.clientY - 25, 
            ballColors[Math.floor(Math.random() * ballColors.length)]
            );
    });

    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity);
    simplePhysic.simulate();
   
    console.log("chapter 1 loaded")
}




