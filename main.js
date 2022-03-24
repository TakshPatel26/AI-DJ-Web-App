song="";
function preload(){
    song = loadSound("music.mp3");
}
scoreRightWrist=0;
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    canvas.position(450,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist= "+scoreRightWrist + "scoreLeftWrist= "+scoreLeftWrist);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+"rightWristY="+rightWristY);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+"leftWristY="+leftWristY);
    }
}
function modelLoaded(){
    console.log("PoseNet is Loaded");
}
function draw(){
    image(video,0,0,600,500);
    fill('red');
    stroke('green');
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("h3_speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        else if(scoreRightWristY>100 && scoreRightWristY<=200){
            document.getElementById("h3_speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if(scoreRightWristY>200 && scoreRightWristY<=300){
            document.getElementById("h3_speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(scoreRightWristY>300 && scoreRightWristY<=400){
            document.getElementById("h3_speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(scoreRightWristY>400){
            document.getElementById("h3_speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY=Number(leftWristY);
        new_leftWristY=floor(InNumberleftWristY*2);
        leftWristY_divided_by_1000=new_leftWristY/1000;
        document.getElementById("h3_volume").innerHTML="Volume = " + leftWristY_divided_by_1000;
        song.setVolume(leftWristY_divided_by_1000);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}