var remainder = function(i, j, posts, events, user) {
  if (j===events.length) {
    let remainderPosts = []
    posts.slice(i).forEach(function(post) {
      var comments = []
      post.comments.forEach(function(comment) {
        comments.push({
          id: comment._id,
          own: user._id.toString() === comment.postedBy._id.toString(),
          createdAt: comment.createdAt,
          postedBy: {
            id: comment.postedBy._id.toString(),
            username: comment.postedBy.username,
            firstName: comment.postedBy.firstName,
            lastName: comment.postedBy.lastName,
            isLoopUser: true         
          },
          text: comment.text
        })
      })      
      remainderPosts.push({
        own: post.own,
        following: post.following,
        createdAt: post.createdAt,
        board: {id: post.board._id, name: post.board.name},
        postedBy: {
          id: post.postedBy.id,
          username: post.postedBy.username,
          firstName: post.postedBy.firstName,
          lastName: post.postedBy.lastName,
          isLoopUser: true
        },
        title: post.title || "",
        text: post.text,
        comments: comments
      });
    })
    return remainderPosts
  } else {
    let remainderEvents = []
    events.slice(j).forEach(function(event) {
      let comments = []
      event.comments.forEach(function(comment) {
        comments.push({
          own: user._id.toString() === comment.postedBy._id.toString(),
          createdAt: comment.createdAt,
          postedBy: {
            id: comment.postedBy._id.toString(),
            username: comment.postedBy.username,
            firstName: comment.postedBy.firstName,
            lastName: comment.postedBy.lastName,
            isLoopUser: true
          },
          text: comment.text
        })
      })
      let attendees = []
      event.attendees.forEach(function(attendee) {
        attendees.push({
          id: attendee._id,
          username: attendee.username,
          firstName: attendee.firstName,
          lastName: attendee.lastName
        })
      })      

      remainderEvents.push({
        createdAt: event.createdAt,
        board: {id: event.board._id, name: event.board.name},        
        date: event.date,
        startTime: event.startTime || "",
        endTime: event.endTime || "",
        location: event.Location || event.location || "",
        title: event.title || "",
        description: event.description || "",
        comments: comments,
        attendees: attendees
      })
    })
    return remainderEvents    
  }
}

module.exports = function(posts, events, user) {
  let i = 0;
  let j = 0;
  let contents = []
  while (i !== posts.length && j !== events.length) {
    if (posts[i].createdAt.getTime() >= events[j].EventDetailUpdatedDate.getTime()) {
      let comments = []
      posts[i].comments.forEach(function(comment) {
        comments.push({
          id: comment._id,
          own: user._id.toString() === comment.postedBy._id.toString(),
          createdAt: comment.createdAt,
          postedBy: {
            id: comment.postedBy._id.toString(),
            username: comment.postedBy.username,
            firstName: comment.postedBy.firstName,
            lastName: comment.postedBy.lastName,
            isLoopUser: true           
          },
          text: comment.text
        })
      })      
      contents.push({
        own: posts[i].own,
        following: posts[i].following,
        createdAt: posts[i].createdAt,
        board: {id: posts[i].board._id, name: posts[i].board.name},
        postedBy: {
          id: posts[i].postedBy.id,
          username: posts[i].postedBy.username,
          firstName: posts[i].postedBy.firstName,
          lastName: posts[i].postedBy.lastName,
          isLoopUser: true
        },
        title: posts[i].title || "",
        text: posts[i].text,
        comments: comments
      });
      i ++;
    } else {
      let comments = []
      events[j].comments.forEach(function(comment) {
        comments.push({
          own: user._id.toString() === comment.postedBy._id.toString(),
          createdAt: comment.createdAt,
          postedBy: {
            _id: comment.postedBy._id.toString(),
            username: comment.postedBy.username,
            firstName: comment.postedBy.firstName,
            lastName: comment.postedBy.lastName,
            isLoopUser: true
          },
          text: comment.text
        })
      })
      let attendees = []
      events[j].attendees.forEach(function(attendee) {
        attendees.push({
          id: attendee._id,
          username: attendee.username,
          firstName: attendee.firstName,
          lastName: attendee.lastName
        })
      })          
      contents.push({
        createdAt: events[j].createdAt,
        board: {id: events[j].board._id, name: events[j].board.name},        
        date: events[j].date,
        startTime: events[j].startTime || "",
        endTime: events[j].endTime || "",
        location: events[j].Location || events[j].location || "",
        title: events[j].title || "",
        description: events[j].description || "",
        comments: comments,
        attendees: attendees
      })
      j ++;
    }
  }
  return contents.concat(remainder(i,j,posts,events,user))
}

