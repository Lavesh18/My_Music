const image = document.querySelector('img');
const tiltle = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//music
const songs = [
    {
        name:'song1',
        displayName:'Circles',
        artist:'Post_Malone',
    },
    {
            name:'song2',
            displayName:'Motely_crew',
            artist:'Post_Malone',
    },
    {
        name:'song3',
        displayName:'Wow',
        artist:'Post_Malone',
    },
    {
        name:'song4',
        displayName:'One_right_now',
        artist:'Post_Malone',
    },
    {
        name:'song5',
        displayName:'Eleven',
        artist:'Khalid',
    },
    {
        name:'song6',
        displayName:'Girls_want_Girls',
        artist:'Drake',
    },
];

//check if playing
let isPlaying = false;
//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}
//pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}

//play or pause event listener
playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));

//update the DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


// current song
let songIndex= 0;
//previous song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length-1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}
//onLoad - select first song
loadSong(songs[songIndex]);

//update progress bar & time
function updateProgressBar(e){
    if(isPlaying){
        const{duration,currentTime} = e.srcElement;
        

        // update progress bar width

        const progressPercent = (currentTime/ duration )*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate the duation
        const duartionMinutes = Math.floor(duration/60);

        let duartionSeconds = Math.floor(duration%60);
        if(duartionSeconds<10){
            duartionSeconds = `0${duartionSeconds}`;
        }
        
        //Delay switching the Element to avoid NAN
        if(duartionSeconds){
            durationEl.textContent = `${duartionMinutes}:${duartionSeconds}`;
        }
        //calculate for currrent time
        const currentMinutes = Math.floor(currentTime/60);

        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

//set progressBar

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

//eventlistner

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);