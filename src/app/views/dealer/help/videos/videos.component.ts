import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from 'app/services/help/video.service';

@Component({
  templateUrl: 'videos.component.html'
})
export class VideosComponent implements OnInit{

  public videosList = [];
  public videoCategories = [];
  public categorySelected = 'todos';
 
  constructor(private sanitizer: DomSanitizer,
              private videoService: VideoService){
  }

  //não remover na implementação
  public showVideo(category: String): boolean{
    let show = true;
   
    if((category == this.categorySelected) || (this.categorySelected == 'todos'))
      show = true;
    else
      show = false;
    
    return show;
  }

  //não remover na implementação
  //chamar no carregamento dos videos vindos do banco
  public urlSanitizer(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public getVideos(){
    this.videoService.getVideo().subscribe( response => {
      this.videosList = response.videos;
      response.videos.forEach(videoResult =>{
        videoResult.safeUrl = this.urlSanitizer(videoResult.url);
        let save = true;
        this.videoCategories.forEach(categoryResult => {
          if(videoResult.category == categoryResult)
            save = false;
        })
  
        if(save == true)
          this.videoCategories.push(videoResult.category);
      
      })
    })
  }

  ngOnInit(){
    this.getVideos();
  }

}
