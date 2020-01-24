import { getSessionUser, starRating,getItem } from './init.js';

const getUsers = () => {
    getSessionUser((state, data) => {
        if (state) {
            $.ajax({
                type: 'GET',
                url: `/api/admin/getUsers/${data.user_id}`,
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    if (data.getEtat) {
                        var contentHeader = `<div class="col-xl-12 col-lg-12">
                            <h3 class="page-title">Liste des utilisateurs beniragi services</h3>
                        
                            <div class="notify-box margin-top-15">
                                <div class="switch-container">
                                    <label class="switch"><span class="switch-text">Filtrer ces resultats <span id="countUsers" style="color:#e53038;font-size:20px;"></span></span></label>
                                </div>
                        
                                <div style="margin-top:-7px;" class="sort-by">
                                    <select id="filterByType">
                                        <option value="tous">Tous</option>
                                        <option value="Employeur">Employeur</option>
                                        <option value="Freelancer">Freelancer</option>
                                    </select>
                                </div>
                            </div>
                        
                            <!-- Freelancers List Container -->
                            <div id="singleListe" class="freelancers-container freelancers-grid-layout margin-top-35">
                            </div>
                            <!-- Freelancers Container / End -->
                        </div>`,
                        tabLength = 0,
                        count = 0;
                        $("#listeUsers").html(contentHeader);
                        data.getObjet.map(usersType => {
                            tabLength = usersType.users.length;
                            count += tabLength;
                            FilterUsersContent(usersType.users, tabLength);
                            $("#countUsers").html(count);
                        });
                        $("#filterByType").on('change', (e) => {
                            var value = $("#filterByType")[0].options[$("#filterByType")[0].selectedIndex].value;
                            filterByType(value, data.getObjet);
                        });
                    } else {   

                    }
                },
                error: function(err) {
                    console.log(err)
                }
            });
        } else {

        }
    });
}

//FiltrageUsersContent
const FilterUsersContent = (tab, tabLength) => {
    var outFreelancer = 0;
    tab.map(freelancer => {
        var name = () => {
            if (freelancer.identity) {
                return `${freelancer.identity.lastName} ${freelancer.identity.name.toUpperCase()}`
            } else {
                return freelancer.email;
            }
        },
        job = () => {
            if (freelancer.job && freelancer.job.name) {
                return `<span style="font-size: .9em"><i class="${freelancer.job.icon}" style="font-size: 1.2em"></i>&nbsp;${freelancer.job.name}</span>`;
            } else {
                return `<br/>`;
            }
        },
        start = () => {
            if (freelancer.typeUser == "Employeur") {
                return ``;
            }else{
                return `<div class="star-rating" data-rating="${freelancer.average}"></div>`;
            }
        },
        contentFreelancer = `<div class="freelancer">
            <div class="freelancer-overview">
                <div class="freelancer-overview-inner">
                    <div class="freelancer-avatar">
                        ${freelancer.certificate && freelancer.certificate.certified == true ? `<div class="verified-badge"></div>` : ''}
                        <a href="/users/12/details"><img src="/images/avatar/undraw_profile_pic_ic5t.png" alt=""></a>
                    </div>
                    <div class="freelancer-name">
                        <h4><a href="/users/12/details">${name()} <img class="flag" src="/images/flags/cd.svg" alt="" title="Congo-Kinshasa" data-tippy-placement="top"></a></h4>
                        ${job()}
                        <h4 style="color:#e53038">${freelancer.typeUser}</h4>
                    </div>
                    <div class="freelancer-rating">
                        ${start()}
                    </div>
                </div>
            </div>
            <div class="freelancer-details">
                <div class="freelancer-details-list">
                    <center>
                        <ul>
                            <li>Localisation <strong style="color: #888;"> ${freelancer.town ? `<i class="icon-material-outline-location-on"></i> ${freelancer.town}` : `---`}</strong></li>
                        <li>Taux <strong style="color: #888;">$${freelancer.hourly ? freelancer.hourly.rate : "0"} / hr</strong></li>
                        <li>A temps <strong style="color: #888;">${freelancer.inTime}%</strong></li>
                        </ul>
                    </center>
                </div>
                <a href="/users/${freelancer._id}/details" class="button button-sliding-icon ripple-effect">Voir le profile <i class="icon-material-outline-arrow-right-alt"></i></a>
            </div>
        </div>`;
        $("#singleListe").append(contentFreelancer);
        outFreelancer++;
        if (outFreelancer == tabLength) {
            //Système étoile
            starRating('.star-rating');

            //Tooltip
            tippy('[data-tippy-placement]', {
                delay: 100,
                arrow: true,
                arrowType: 'sharp',
                size: 'regular',
                duration: 200,

                // 'shift-toward', 'fade', 'scale', 'perspective'
                animation: 'scale',

                animateFill: true,
                theme: 'dark',

                // How far the tooltip is from its reference element in pixels 
                distance: 10

            });


        }
    });
}

//Filtrage par type
const filterByType = (value, tab) => {
    if (value == "tous") {
        $("#singleListe").html('');
        var count = 0;
        tab.map(usersType => {
            tabLength = usersType.users.length;
            count += tabLength;
            FilterUsersContent(usersType.users, tabLength);
            $("#countUsers").html(count);
        });
    } else {
        var tab;
        tab = getItem(tab, value);
        if (tab.users.length > 0) {
            //Vide le contenu qui y avait avant
            $("#singleListe").html('');
            var tabLength = tab.users.length;
            var count = tabLength;
            FilterUsersContent(tab.users, tabLength);
            $("#countUsers").html(count);
        }
    }
}

export { getUsers }