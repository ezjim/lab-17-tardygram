const { getAgent, getUser, getComment, getInsta } = require('../db/data-helpers');

describe('comments routes', () => {
  it('creates a comment', async() => {
    const user = await getUser({ username: 'jimmy' });
    const insta = await getInsta({ user: user._id });
    return getAgent()
      .post('/api/v1/comments')
      .send({
        comment: 'my title',
        body: 'my body'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'my title',
          body: 'my body',
          author: user._id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('updates a comment', async() => {
    const user = await getUser({ username: 'jimmy' });
    const comment = await getComment({ author: user._id });

    return getAgent()
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ title: 'My cool comment' })
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          updatedAt: expect.any(String),
          title: 'My cool comment'
        });
      });
  });

  it('deletes a comment', async() => {
    const user = await getUser({ username: 'jimmy' });
    const comment = await getComment({ author: user._id });

    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});

