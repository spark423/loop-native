<?php
 $title = 'Loop';
 $description = '';
 $canonical = '';
 $keywords = '';
 $page_css = '';
 include 'sxn/hdr/sxn-hdr.php';​
?>
<?php include 'sxn/sidenav/sxn-sidenav.php'; ?>

<div class="col-tog single-col">

    <div class="app">

        <?php include 'sxn/topbar/sxn-topbar.php'; ?>

        <?php include 'sxn/profile-header/sxn-profile-header.php'; ?>
        <?php include 'sxn/profile-user/sxn-profile-user.php'; ?>
        <?php include 'sxn/bio/sxn-bio.php'; ?>
        <?php include 'sxn/tags-followed/sxn-tags-followed.php'; ?>
        <?php include 'sxn/titles/sxn-titles.php'; ?>
        <?php include 'sxn/boards-following/sxn-boards-following.php'; ?>
        <?php include 'sxn/board-permissions/sxn-board-permissions.php'; ?>

    </div>

</div>

<div class="col-tog double-col" hidden>

    <div class="side-col">
        <div class="side-col-scroll">

            <?php include 'side-sxn/scroll-title-home/sxn-scroll-title-home.php'; ?>

        </div>
    </div>

    <div class="app double">

        <?php include 'sxn/topbar/sxn-topbar.php'; ?>

        <?php include 'sxn/profile-header/sxn-profile-header.php'; ?>
        <?php include 'sxn/profile-user/sxn-profile-user.php'; ?>
        <?php include 'sxn/bio/sxn-bio.php'; ?>
        <?php include 'sxn/tags-followed/sxn-tags-followed.php'; ?>
        <?php include 'sxn/titles/sxn-titles.php'; ?>
        <?php include 'sxn/boards-following/sxn-boards-following.php'; ?>
        <?php include 'sxn/board-permissions/sxn-board-permissions.php'; ?>

    </div>

</div>

<?php include 'sxn/ftr/sxn-ftr.php'; ?>