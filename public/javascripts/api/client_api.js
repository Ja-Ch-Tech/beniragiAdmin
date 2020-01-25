import { getSessionUser, starRating,getItem, customDate } from './init.js';

const getUsers = () => {
    getSessionUser((state, data) => {
        console.log(data)
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
                        <a href="/users/${freelancer._id}/details"><img src="/images/avatar/undraw_profile_pic_ic5t.png" alt=""></a>
                    </div>
                    <div class="freelancer-name">
                        <h4><a href="/users/${freelancer._id}/details">${name()} <img class="flag" src="/images/flags/cd.svg" alt="" title="Congo-Kinshasa" data-tippy-placement="top"></a></h4>
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

//Recupere les details d'un utilisateur
const getUserDetails = (user_id) => {
    getSessionUser((state, data) => {
        if (state) {
            $.ajax({
                type: 'GET',
                url: `/api/admin/users/${user_id}/details`,
                dataType: "json",
                success: function(datas) {
                    if (datas.getEtat) {
                        var freelancer = datas.getObjet,
                            name = () => {
                                if (freelancer.identity) {
                                    return `${freelancer.identity.lastName} ${freelancer.identity.name.toUpperCase()}`
                                } else {
                                    return freelancer.email;
                                }
                            },
                            skills = () => {
                                if (freelancer.skills && freelancer.skills.length > 0) {
                                    return `<span>${freelancer.skills[0]} ${freelancer.skills.length > 1 ? ` + ${freelancer.skills[1]}` : ""}</span>`;
                                } else {
                                    return `Aucune competence specifiée`;
                                }
                            },
                            bio = () => {
                                if (freelancer.bio) {
                                    return `<p>${freelancer.bio.bio}</p>`
                                } else {
                                    return `<p style="color: #ccc">Aucune description sur cet utilisateur</p>`
                                }
                            },
                            numberPhone = () => {
                                if (freelancer.identity) {
                                    if (freelancer.identity.phoneNumber) {
                                        return `<li><i class="icon-line-awesome-mobile-phone"></i>${freelancer.identity.phoneNumber}</li>`;
                                    } else {return `Aucun numero de telephone`}
                                } else {return `Aucun numero de telephone`}
                            },
                            feedbacks = () => {
                                if (freelancer.typeUser !== "Employeur") {
                                    if (freelancer.feedBacks) {
                                        if (freelancer.feedBacks.length > 0) {
                                            var feedBackHeader = `
                                            <div class="boxed-list-headline">
                                                <h3><i class="icon-material-outline-thumb-up"></i> Feedbacks (${freelancer.feedBacks.length})</h3>
                                            </div>
                                            <ul id="feedbackListe" class="boxed-list-ul">
                                            </ul>`;
                                            $("#feedbackBox").html(feedBackHeader);
                                            freelancer.feedBacks.map(feedBack => {
                                                var feedBackContent = `
                                                <li>
                                                    <div class="boxed-list-item">
                                                        <!-- Content -->
                                                        <div class="item-content">
                                                            <div class="item-details margin-top-10">
                                                                <div class="star-rating" data-rating="${feedBack.evaluation.note}"></div>
                                                                <div class="detail-item"><i class="icon-material-outline-date-range"></i>${customDate(feedBack.evaluation.created_at)}</div>
                                                            </div>
                                                            <div class="item-description">
                                                                <p>${feedBack.evaluation.message ? feedBack.evaluation.message : `` }</p>
                                                            </div>
                                                            <a class="button gray pull-right ripple-effect margin-top-5 margin-bottom-10 text-capitalize"><i
                                                                            class="icon-feather-user"></i>&nbsp;${feedBack.identity_employeur.identity ? feedBack.identity_employeur.identity.lastName + " " + feedBack.identity_employeur.identity.name : feedBack.identity_employeur.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>`;
                                                $("#feedbackListe").append(feedBackContent);
                                            });
                                        } else {$("#feedbackBox").html(`Aucun feedBack n'est emit sur cet utilisateur`)}
                                    } else {$("#feedbackBox").html(`Aucun feedBack n'est emit sur cet utilisateur`)}
                                }
                            },
                            judgement = () => {
                                if (freelancer.inTime == 100) {
                                    return "Super-Flash au boulot !"
                                }else if (freelancer.inTime >= 75) {
                                    return "Flash au boulot !"
                                }else if (freelancer.inTime > 50) {
                                    return "Rapide au boulot !"
                                }else if (freelancer.inTime == 50) {
                                    return "Vitesse normale"
                                }else if (freelancer.inTime >= 40) {
                                    return "Assez rapide, mais plus lent !"
                                }else if (freelancer.inTime >= 20) {
                                    return "Lent !"
                                }else if (freelancer.inTime > 0) {
                                    return "Trop lent, trop lent..."
                                }else if (freelancer.inTime == 0) {
                                    return "Pas encore côté"
                                }
                            },
                            skillsForUser = () => {
                                if (freelancer.typeUser !== "Employeur") {
                                    var skillsHeader = `
                                    <h3>competences</h3>
                                    <div id="task-tags" class="task-tags">
                                        
                                    </div>`;
                                    $("#skillsForUser").html(skillsHeader);
                                    if (freelancer.skills && freelancer.skills > 0) {
                                        freelancer.skills.map((skill) => {
                                            $("#skillsForUser").append(`<a href="https://www.google.com/search?q=Compétence+en+${skill.toLowerCase()}" target="_blank" style="margin-left: 4px"><span>${skill}</span></a>`);
                                        });
                                    } else {
                                        $("#task-tags").append("Aucune competence n'est specifiée");
                                    }
                                    
                                }
                            },
                            certificate = () => {
                                if (freelancer.typeUser !== "Employeur") {
                                    if (freelancer.certificate && freelancer.certificate.certified == true) {
                                        return `<li><div class="verified-badge-with-title">Déjà certifié</div></li>`;
                                    } else {
                                        return `<li data-tippy-placement="top" title="Cliquez ici pour certifié cet utilisateur"><div style="cursor:pointer;" class="stop-badge-with-title actionCertication">Certifié cet utilisateur</div></li>`;
                                    }
                                }else{
                                    return ``;
                                }
                            },
                            contentHeader = `
                            <div class="single-page-header freelancer-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="single-page-header-inner">
                                                <div class="left-side">
                                                    <div class="header-image freelancer-avatar">
                                                        <img src="/images/avatar/undraw_profile_pic_ic5t.png" alt="">
                                                    </div>
                                                    <div class="header-details">
                                                        <h3>${name()} <span>${freelancer.job && freelancer.job.icon ? `<i class="${freelancer.job.icon}" style="font-size: 1.6em"></i>&nbsp;` : ""}${freelancer.job ? freelancer.job.name : "Aucun metier specifié"}</span></h3><br/>
                                                        <h3 style="color:red">${freelancer.typeUser}</h3>
                                                        <ul>
                                                            <li><div class="star-rating" data-rating="${freelancer.average}"></div></li>
                                                            <li style="text-transform: capitalize">
                                                                ${freelancer.town ? `${freelancer.town}&nbsp;&nbsp;<img class="flag" src="/images/flags/cd.svg" alt="" title="Congo-Kinshasa" data-tippy-placement="top">` : "Aucune ville specifiée"}
                                                            </li>
                                                            ${certificate()}
                                                            ${numberPhone()}
                                                            ${freelancer.email ? `<li><i class="icon-material-baseline-mail-outline"></i>${freelancer.email}</li>` : `Aucun email specifié` }
                                                            
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-xl-8 col-lg-8 content-right-offset">
                                        <!-- Page Content -->
                                        <div class="single-page-section">
                                            <h3 class="margin-bottom-25">A propos</h3>
                                            <p>
                                                ${bio()}
                                            </p>
                                        </div>
                                        <!-- Boxed List -->
                                        <div id="feedbackBox" class="boxed-list margin-bottom-60">
                                            

                                        </div>
                                        <!-- Boxed List / End -->
                                    </div>
                                    <div class="col-xl-4 col-lg-4">
                                        <div class="sidebar-container">
                                            <!-- Profile Overview -->
                                            <div class="profile-overview">
                                                ${freelancer.hourly ? `<div class="overview-item"><strong>$${freelancer.hourly.rate}</strong><span>Taux horaire</span></div>` : ""}
                                            </div>

                                            <!-- Button -->
                                            <a href="#" class="apply-now-button popup-with-zoom-anim margin-bottom-50">Bloquer son compte</a>

                                            <!-- Freelancer Indicators -->
                                            <div class="sidebar-widget">
                                                <div class="freelancer-indicators">
                                                    <!-- Indicator -->
                                                    <div class="indicator">
                                                        ${freelancer.typeUser !== "Employeur" ? `<strong>${freelancer.inTime}%</strong>
                                                        <div class="indicator-bar" data-indicator-percentage="${freelancer.inTime}"><span></span></div>
                                                        <span>${judgement()}</span>` : ``}
                                                    </div>  
                                                </div>
                                            </div>

                                            <!-- Widget -->
                                            <div id="skillsForUser" class="sidebar-widget">
                                                
                                            </div>

                                            <!-- Widget -->
                                            <div class="sidebar-widget">
                                                <h3>Pieces jointes</h3>
                                                <div class="attachments-container">
                                                    <a href="#" class="attachment-box ripple-effect"><span>Cover Letter</span><i>PDF</i></a>
                                                    <a href="#" class="attachment-box ripple-effect"><span>Contract</span><i>DOCX</i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        $("#contentDetailsUser").html(contentHeader)
                        //Chargement des feedbacks
                        feedbacks();
                        //Chargement des competences
                        skillsForUser();
                        //Chargement des etoiles
                        starRating(".star-rating");
                        //Gestion du tooltip
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
                            distance: 10,

                        });

                        //Certification manuel
                        $(".actionCertication").on('click', (e) => {
                            certifiedUser(freelancer._id, e);
                        });
                    } else {}
                    console.log(datas)
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    });
}

//Permet de certifier manuellement un utilisateur
const certifiedUser = (user_id, element) => {
    getSessionUser((state, data) => {
        if (state) {
            $.ajax({
                type: 'POST',
                url: `/api/admin/users/certified/${user_id}`,
                dataType: "json",
                beforeSend : function () {
                    element.currentTarget.innerHTML = `Certification en cours...`;
                },
                success: function(data) {
                    if (data.getEtat) {
                        element.currentTarget.parentNode.innerHTML = `<div class="verified-badge-with-title">Déjà certifié</div>`;
                        console.log(element.currentTarget.parentNode);
                        Snackbar.show({
                            text: "La Certification manuelle de cet utilisateur à reussi",
                            pos: 'top-center',
                            showAction: true,
                            actionText: "Fermer",
                            duration: 3000,
                            textColor: '#fff',
                            backgroundColor: '#3696f5'
                        });
                    } else {
                        element.currentTarget.parentNode.innerHTML = `<div style="cursor:pointer;" class="stop-badge-with-title actionCertication">Certifié cet utilisateur</div>`;
                        Snackbar.show({
                            text: data.getMessage,
                            pos: 'top-center',
                            showAction: true,
                            actionText: "Fermer",
                            duration: 3000,
                            textColor: '#fff',
                            backgroundColor: '#ad344b'
                        });
                    }
                },
                error: function(err) {
                    element.currentTarget.parentNode.innerHTML = `<div style="cursor:pointer;" class="stop-badge-with-title actionCertication">Certifié cet utilisateur</div>`;
                    Snackbar.show({
                        text: "Aucune connexion, verifiez votre connexion internet",
                        pos: 'top-center',
                        showAction: true,
                        actionText: "Fermer",
                        duration: 3000,
                        textColor: '#fff',
                        backgroundColor: '#ad344b'
                    });
                }
            });
        }else{
            Snackbar.show({
                text: "Votre session a expiré, reconnecter vous!",
                pos: 'top-center',
                showAction: true,
                actionText: "Fermer",
                duration: 3000,
                textColor: '#fff',
                backgroundColor: '#ad344b'
            });
        }
    })
}

export { getUsers, getUserDetails }