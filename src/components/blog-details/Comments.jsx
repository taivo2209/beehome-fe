import { useEffect, useState } from 'react';
import Ratings from './Ratings';

const Comments = ({ comments }) => {
  // console.log(comments);
  return (
    <>
      {comments.map((item) => (
        <div className="mbp_first media" key={item.comment.id}>
          <img
            src={item?.comment?.user?.customer?.avatar?.path}
            className="mr-3"
            alt={item.comment.img}
            width={40}
            height={40}
          />
          <div className="media-body">
            <h4 className="sub_title mt-0">
              {item.comment?.user?.customer?.firstName}{' '}
              {item.comment?.user?.customer?.lastName}
              <span className="sspd_review">
                <ul className="mb0 pl15">
                  <Ratings star={item.comment.star} />
                </ul>
              </span>
            </h4>
            <a className="sspd_postdate fz14" href="#">
              {item.comment.data}
            </a>
            <p className="fz14 mt10">{item.comment.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
