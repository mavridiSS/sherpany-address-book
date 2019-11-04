class IdleWatcher {
  constructor(timeout, onIdle) {
    this.timer = null;
    this.timeout = timeout;
    this.onIdle = onIdle;
  }
  /**
   * Invoked when a user is not idle anymore
   * Clears and sets the timer again to check if user is idle
   * @memberof UsersTableWrapper
   */
  resetTimer = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onIdle, this.timeout);
  };

  /**
   * Logic for idle user
   * @memberof UsersTableWrapper
   */
  watch = () => {
    window.onload = this.resetTimer;
    window.onmousemove = this.resetTimer;
    window.onmousedown = this.resetTimer;
    window.ontouchstart = this.resetTimer;
    window.onclick = this.resetTimer;
    window.onkeypress = this.resetTimer;
    window.addEventListener("scroll", this.resetTimer, true);
  };

  /**
   * Removes idle timeout
   *
   * @memberof IdleWatcher
   */
  remove = () => {
    clearTimeout(this.timer);
  };
}

export default IdleWatcher;
