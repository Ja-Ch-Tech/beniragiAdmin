import { starRating, customDate } from './init.js';

const list = () => {
    $.ajax({
        url: '/api/admin/vip/new',
        type: 'GET',
        dataType: "json",
        beforeSend: function () {},
        success: function (data) {
            if (data.getEtat) {
                var contentHead = `<div class="headline">
                                        <h3><i class="icon-material-outline-supervisor-account"></i> ${data.getObjet.length} demandes</h3>
                                    </div>
                                    <div class="content">
                                        <ul class="dashboard-box-list" id="listUsersVIP">
                                        </ul>
                                    </div>`;

                $("#newVIPRequest").html(contentHead);

                var out = 0;

                data.getObjet.map((value, index, tab) => {
                    out++;
                    var freelancer = value.infos;
                    var name = () => {
                        if (freelancer.identity) {
                            return `${freelancer.identity.lastName} ${freelancer.identity.name.toUpperCase()}`
                        } else {
                            return freelancer.email;
                        }
                    },
                    content = `<li>
							<!-- Overview -->
							<div class="freelancer-overview manage-candidates">
								<div class="freelancer-overview-inner">

									<!-- Avatar -->
									<div class="freelancer-avatar">
										${freelancer.certificate && freelancer.certificate.certified == true ? `<div class="verified-badge"></div>` : ''}

										<a href="#"><img src="/images/avatar/undraw_profile_pic_ic5t.png" alt=""></a>
									</div>

									<!-- Name -->
									<div class="freelancer-name">
										<h4><a href="#">${name()} <img class="flag" src="/images/flags/cd.svg" alt="" title="Congo-Kinshasa" data-tippy-placement="top"></a></h4>
										<!-- Details -->
										<span class="freelancer-detail-item"><a href="#"><i class="icon-feather-mail"></i> ${freelancer.email}</a></span>
										${freelancer.identity && freelancer.identity.phoneNumber ? `<span class="freelancer-detail-item"><i class="icon-feather-phone"></i> ${freelancer.identity.phoneNumber}</span>` : ""}
										<span class="freelancer-detail-item"><i class="icon-line-awesome-clock-o"></i> ${customDate(value.created_at)}</span>

										<!-- Rating -->
										<div class="freelancer-rating">
											<div class="star-rating" data-rating="${freelancer.average}"></div>
										</div>

										<!-- Buttons -->
										<div class="buttons-to-right always-visible margin-top-25 margin-bottom-5">
											<a href="#" class="button ripple-effect" onclick="responseRequest('${value.id_vip}', 'true')"><i class="icon-feather-check"></i> Accepter la demande</a>
											<a href="#small-dialog" class="popup-with-zoom-anim button dark ripple-effect"><i class="icon-feather-user"></i> Voir le profile</a>
											<a href="#" class="button gray ripple-effect ico" title="Supprimer la demande" data-tippy-placement="top" onclick="responseRequest('${value.id_vip}', 'false')"><i class="icon-feather-trash-2"></i></a>
										</div>
									</div>
								</div>
							</div>
                        </li>`;
                        
                    $("#listUsersVIP").append(content);

                    if (out == tab.length) {
                        starRating(".star-rating");
                    }
                })
            } else {
                
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

export { list as newVIP }