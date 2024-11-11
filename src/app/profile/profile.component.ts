import { OnInit } from '@angular/core';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginServiceService } from '../login/login-service.service';
import { User } from '../models/user';
import { People } from '../models/people';
import { TwitterServiceService } from '../twitter-service.service';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from '../follow-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userId: string | null = null;
  isAdminPage=false;
  showProfile=false;
  user: User = new User();
  peoples?:People[];
  selectedFile?: File;
  imagePreviewUrl: string | ArrayBuffer | null = null; // This will store the preview URL
  showUpdateModel = false;
  isModalVisible = false;
  isOpen: boolean = false;
  profileImageUrl:any;
  isCardBoxVisible = false;
  @ViewChild('cardBox') cardBox: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,private location:Location, 
    private loginService:LoginServiceService, 
    private twitterServuce:TwitterServiceService,
    private followService:FollowService) {
  }



  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId===localStorage.getItem('userId')){
      this.showProfile=true;
      this.isAdminPage=true;
      console.log(this.showProfile);
    } else{
      this.showProfile=false;
      this.isAdminPage=false;
    }
   this.loginService.findByUserId(this.userId).subscribe(
    response => {
      this.user=response;// Navigate to a protected route on successful login
      // Handle successful login
      console.log('response for user'+this.user.full_name);
    },
    error => {
      console.error("error", error);
    }
  );
  this.twitterServuce.fetchPeoples().subscribe(res=>{
       this.peoples=res;
  }); 
  }

  navigateWithParams(id:any) {
    console.log('id'+id);
    // Using `navigate` with route parameters and query parameters
    this.router.navigate(['/dashboard/profile', id]); 
    this.ngOnInit();   
  }

  navigateFollowDetail(followingType:any):void{
    console.log('this is follow detail navigation page');
    localStorage.setItem('followingType', followingType);
    this.router.navigate(['/follow-detail', this.userId]); 
  }

  unFollow(userId:any):void{
    this.followService.delete(userId).subscribe(resp=>{
          this.ngOnInit();   
    });
  }

  follow(userId:any):void{
    this.followService.follow(userId).subscribe(resp=>{
          this.ngOnInit();   
    });
  }

  goBack(): void {
    this.location.back(); // This will navigate to the previous page
  }

  public scrollLeft() {
    const container = document.querySelector('.overflow-x-auto') as HTMLElement;
    container.scrollBy({ left: -250, behavior: 'smooth' }); // Adjust scroll distance as needed
  }

  public scrollRight() {
    const container = document.querySelector('.overflow-x-auto') as HTMLElement;
    container.scrollBy({ left: 250, behavior: 'smooth' }); // Adjust scroll distance as needed
  }

  public openModal() {
    this.isModalVisible = true;
  }

  public closeModal() {
    this.isModalVisible = false;
  }

  toggleCard(event: Event) {
    event.stopPropagation(); // Prevent click propagation to document
    this.isCardBoxVisible = !this.isCardBoxVisible;
  }

  // Close the card box if clicked outside of it
  @HostListener('document:click', ['$event'])
  closeCardBox(event: MouseEvent) {
    if (this.cardBox && !this.cardBox.nativeElement.contains(event.target)) {
      this.isCardBoxVisible = false; // Close card box if clicked outside
    }
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('profile_image_url');
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/login']);
    console.log("User logged out");
  }

  onOptionClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent click from closing the card-box
    console.log('Option clicked:', event.target); // You can handle option selection here

  }
}