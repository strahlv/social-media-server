module.exports = (schema) => {
  schema.methods.like = async function (user) {
    const userId = user._id;

    if (!this.likes.includes(userId)) {
      this.likes.push(user);

      if (this.dislikes.includes(userId)) {
        const index = this.dislikes.indexOf(userId);
        this.dislikes.splice(index, 1);
      }
    } else {
      const index = this.likes.indexOf(userId);
      this.likes.splice(index, 1);
    }

    await this.save();
  };

  schema.methods.dislike = async function (user) {
    const userId = user._id;

    if (!this.dislikes.includes(userId)) {
      this.dislikes.push(user);

      if (this.likes.includes(userId)) {
        const index = this.likes.indexOf(userId);
        this.likes.splice(index, 1);
      }
    } else {
      const index = this.dislikes.indexOf(userId);
      this.dislikes.splice(index, 1);
    }

    await this.save();
  };
};
