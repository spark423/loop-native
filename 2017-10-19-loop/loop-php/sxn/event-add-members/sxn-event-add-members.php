<link rel="stylesheet" href="sxn/event-add-members/sxn-event-add-members.min.css" />

<div id="event-add-members">
    <div class="uk-card uk-card-default uk-card-body">
        <div class="add-members-wrap">
            <ul class="add-members-row-wrap">
                <li class="add-members-row">
                    <div>
                        <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                            <li><a href="#">All</a></li>
                            <li><a href="#">People</a></li>
                            <li><a href="#">Organizations</a></li>
                            <li><a href="#">Tags</a></li>
                        </ul>
                    </div>
                </li>
                <li class="add-members-row">
                    <div>
                        <div class="grid-remainder">
                            <form class="uk-search uk-search-default">
                                <span uk-search-icon></span>
                                <input class="uk-search-input" type="search" placeholder="Start typing to search or add">
                            </form>
                        </div>
                        <div class="grid-limit">
                            <a href="" class="green">
                                <span href="#" class="uk-icon" uk-icon="icon: mail"></span>
                                <span>Message all attendees</span>
                            </a>
                        </div>
                        <div class="uk-clearfix"></div>
                    </div>
                </li>
                <li class="add-members-row inner-list-wrap">
                    <div class="inner-list">
                        <ul class="row">
                            <li class="row">
                                <div class="member" uk-grid>
                                    <div class="uk-width-auto@m">
                                        <div class="img-wrap one"></div>
                                    </div>
                                    <div class="uk-width-expand@m">
                                        <p class="name">Alex Reekie</p>
                                        <p class="major">English Literature, 2017</p>
                                    </div>
                                </div>
                                <div class="more">
                                    <div class="uk-inline">
                                        <a href="#" class="uk-icon-link" uk-icon="icon: more-vertical"></a>
                                        <?php include 'elements/element-attendee-menu.php'; ?>
                                    </div>
                                </div>
                            </li>
                            <li class="row">
                                <div class="member" uk-grid>
                                    <div class="uk-width-auto@m">
                                        <div class="img-wrap two"></div>
                                    </div>
                                    <div class="uk-width-expand@m">
                                        <p class="name">Georgina Reekie</p>
                                        <p class="major">English Literature, 2017</p>
                                    </div>
                                </div>
                                <div class="more">
                                    <div class="uk-inline">
                                        <a href="#" class="uk-icon-link" uk-icon="icon: more-vertical"></a>
                                        <?php include 'elements/element-attendee-menu.php'; ?>
                                    </div>
                                </div>
                            </li>
                            <li class="row">
                                <div class="member" uk-grid>
                                    <div class="uk-width-auto@m">
                                        <div class="img-wrap one"></div>
                                    </div>
                                    <div class="uk-width-expand@m">
                                        <p class="name">Alex Reekie</p>
                                        <p class="major">English Literature, 2017</p>
                                    </div>
                                </div>
                                <div class="more">
                                    <div class="uk-inline">
                                        <a href="#" class="uk-icon-link" uk-icon="icon: more-vertical"></a>
                                        <?php include 'elements/element-attendee-menu.php'; ?>
                                    </div>
                                </div>
                            </li>
                            <li class="row">
                                <div class="member" uk-grid>
                                    <div class="uk-width-auto@m">
                                        <div class="img-wrap two"></div>
                                    </div>
                                    <div class="uk-width-expand@m">
                                        <p class="name">Georgina Reekie</p>
                                        <p class="major">English Literature, 2017</p>
                                    </div>
                                </div>
                                <div class="more">
                                    <div class="uk-inline">
                                        <a href="#" class="uk-icon-link" uk-icon="icon: more-vertical"></a>
                                        <?php include 'elements/element-attendee-menu.php'; ?>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="add-members-row">
                    <a class="uk-button uk-button-primary" type="button">Create</a>
                    <a class="uk-button uk-button-cancel" type="button">Back</a>
                </li>
            </ul>
        </div>

    </div>
</div>
