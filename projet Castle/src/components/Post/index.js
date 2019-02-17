  // src/components/Post/index.js
  import "./Post.css";
  import React, { Component } from "react";
  class Post extends Component {
    render() {
        const nickname = this.props.nickname;
        const avatar = this.props.avatar;
        const image = this.props.image;
        const caption = this.props.caption;
        const link=this.props.link;
      return <article className="Post" ref="Post">
          <header className="Post-Header">
            <div className="Post-user">
              <div className="Post-user-avatar">
                <img src={avatar} alt={nickname} />
              </div>
              <div className="Post-user-nickname">
                <span>{nickname}</span>
              </div>
            </div>
          </header>
          <div className="Post-image">
            <a href={link}>
              <div className="Post-image-bg">
                <img alt="{caption}" src={image} />
              </div>
            </a>
          </div>
          <div className="Post-caption">
            <strong>{nickname} </strong><br/><strong>{caption} €</strong>
          </div>
        </article>;
      }
  }
  export default Post;