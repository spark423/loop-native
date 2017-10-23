<link rel="stylesheet" href="sxn/poll-board-notifications-create/sxn-poll-board-notifications-create.v4.min.css" />

<div id="poll-board-notifications-create">
    <h4>Board Notifications</h4>
    <div class="uk-card uk-card-default uk-card-body">
        <div class="slide-link left">
            <a href="" class="uk-slidenav-large disabled" uk-slidenav-previous></a>
        </div>
        <div class="slide-link right">
            <a href="" class="green uk-slidenav-large" uk-slidenav-next></a>
        </div>

        <!-- Single Col -->

        <div class="app-link uk-grid-match uk-child-width-1-3@m triple-wrap" uk-grid>

            <div>
                <div class="uk-grid-match" uk-grid>
                    <div class="uk-width-1-3@m">
                        <span uk-icon="icon: user"></span>
                    </div>
                    <div class="uk-width-2-3@m">
                        <p class="title">Firstname Lastname</p>
                        <p class="text-light">Yesterday at 4:56pm</p>
                        <p>Lorem ipsum dolor sit amet, sed do eiusmod.</p>
                        <span><a class="green" href="#">View</a></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-grid-match" uk-grid>
                    <div class="uk-width-1-3@m">
                        <span uk-icon="icon: user"></span>
                    </div>
                    <div class="uk-width-2-3@m">
                        <p class="title">Firstname Lastname</p>
                        <p class="text-light">Yesterday at 4:56pm</p>
                        <p>Lorem ipsum dolor sit amet, sed do eiusmod.</p>
                        <span class="green">Approve?<a class="approval yes" href="#">Yes</a><a class="approval" href="#">No</a></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-grid-match" uk-grid>
                    <div class="uk-width-1-3@m">
                        <span uk-icon="icon: warning"></span>
                    </div>
                    <div class="uk-width-2-3@m">
                        <p class="title">Firstname Lastname</p>
                        <p class="text-light">Yesterday at 4:56pm</p>
                        <p>Lorem ipsum dolor sit amet, sed do eiusmod.</p>
                        <span><a class="green" href="#">View Flagged Post</a></span>
                    </div>
                </div>
            </div>

        </div>

        <!-- Double Col -->

        <div class="app-link uk-grid-match uk-child-width-1-2@m triple-wrap" uk-grid hidden>

            <div>
                <div class="uk-grid-match" uk-grid>
                    <div class="uk-width-1-3@m">
                        <span uk-icon="icon: user"></span>
                    </div>
                    <div class="uk-width-2-3@m">
                        <p class="title">Firstname Lastname</p>
                        <p class="text-light">Yesterday at 4:56pm</p>
                        <p>Lorem ipsum dolor sit amet, sed do eiusmod.</p>
                        <span><a class="green" href="#">View</a></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-grid-match" uk-grid>
                    <div class="uk-width-1-3@m">
                        <span uk-icon="icon: user"></span>
                    </div>
                    <div class="uk-width-2-3@m">
                        <p class="title">Firstname Lastname</p>
                        <p class="text-light">Yesterday at 4:56pm</p>
                        <p>Lorem ipsum dolor sit amet, sed do eiusmod.</p>
                        <span class="green">Approve?<a class="approval yes" href="#">Yes</a><a class="approval" href="#">No</a></span>
                    </div>
                </div>
            </div>

        </div>

        <div class="create-wrap">
            <h4 class="inner">New Poll</h4>
            <div class="divider"></div>
            <div class="create-grid" uk-grid>
                <div class="poll-wrap uk-width-3-5@m">
                    <div class="form-wrap">
                        <form>
                            <input class="uk-input uk-form-large uk-form-blank uk-form-width-large" type="text" placeholder="Title Lorem Ipsum"></input>
                        </form>
                        <form>
                            <textarea class="uk-textarea uk-form-blank uk-form-width-large" type="text" placeholder="Add a description"></textarea>
                        </form>

                        <div uk-grid>
                            <div class="uk-width-1-2@m">
                                <div class="poll">
                                    <h5>Poll Options</h5>
                                    <div class="create-grid" uk-grid>
                                        <div class="poll-wrap uk-width-expand@m">
                                            <span>Option 1</span>
                                        </div>
                                        <div class="uk-width-auto@m">
                                            <span uk-icon="icon: close"></span>
                                        </div>
                                    </div>
                                    <div class="create-grid" uk-grid>
                                        <div class="poll-wrap uk-width-expand@m">
                                            <span>Option 2</span>
                                        </div>
                                        <div class="uk-width-auto@m">
                                            <span uk-icon="icon: close"></span>
                                        </div>
                                    </div>
                                    <div class="create-grid" uk-grid>
                                        <div class="poll-wrap uk-width-expand@m">
                                            <span>Option 3</span>
                                        </div>
                                        <div class="uk-width-auto@m">
                                            <span uk-icon="icon: close"></span>
                                        </div>
                                    </div>
                                    <div class="create-grid" uk-grid>
                                        <div class="poll-wrap uk-width-1-1@m">
                                            <a class="add" href="">
                                                <span uk-icon="icon: plus"></span><span>Add Option</span>
                                            </a>
                                        </div>
                                        <div class="poll-wrap uk-width-1-1@m">
                                            <label><input class="uk-checkbox" type="checkbox" checked> Allow other to create responses</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-width-1-2@m">
                                &nbsp;
                            </div>
                        </div>

                        <a class="uk-button uk-button-primary" type="button">Create</a>
                        <a class="uk-button uk-button-cancel" type="button">Back</a>
                    </div>
                </div>
                <div class="uk-width-2-5@m">
                    <div class="list-wrap">
                        <ul>
                            <li>
                                <a href="">
                                    <span uk-icon="icon: image"></span><span>Add image</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span uk-icon="icon: hashtag"></span><span>Add tags</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span uk-icon="icon: bell"></span><span>Set alert</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span uk-icon="icon: cog"></span><span>Manage privacy settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
