class FollowingTableModel {
  followId: number;
  followingId: number;
  followerId: number;
  
  

  constructor(pictureId: number, followingId: number, followerId: number) {
    this.followId = followerId; 
    this.followingId = followerId;
    this.followerId = followingId;
  }
}

export default FollowingTableModel;