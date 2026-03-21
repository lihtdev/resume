$(function() {
	var enableCrypto = resume.crypto_enabled;

	// 根据生日计算年龄
	var birthday = new Date(resume.birthday + 'T00:00:00');
	var today = new Date();
	var birthYear = birthday.getFullYear();
	var thisYear = today.getFullYear();
	birthday.setFullYear(thisYear);
	var age;
	if (today.getTime() > birthday.getTime()) {
		age = thisYear - birthYear;
	} else {
		age = thisYear - birthYear - 1;
	}

	// 根据参加工作时间计算工作年限
	var workYears;
	var workDateTo = resume.work_date_to ? new Date(resume.work_date_to + 'T00:00:00') : today;
	var workDateToYear = workDateTo.getFullYear();
	var workDateFrom = new Date(resume.work_date_from + 'T00:00:00');
	var workDateFromYear = workDateFrom.getFullYear();
	workDateFrom.setFullYear(workDateToYear);
	if (workDateTo.getTime() > workDateFrom.getTime()) {
		workYears = workDateToYear - workDateFromYear;
	} else {
		workYears = workDateToYear - workDateFromYear - 1;
	}

	var resumeCache = {
		type : 'default',
		time : new Date().getTime(),
		phone : '180******00',
		wechat : '******',
		edu_exp : [
			{
				form_date : 'X年X月',
				to_date : 'X年X月',
				school : 'XXX学校',
				major : 'XXX专业',
				degree : 'XXX学历'
			}
		]
	}

	var resumeRender = function() {
		var _resume_cache = getCache('resume_cache');
		resumeCache = _resume_cache ? _resume_cache : resumeCache;
		var phoneNumber = enableCrypto ? resumeCache.phone : resume.phone;
		var wechat = enableCrypto ? resumeCache.wechat : resume.wechat;
		var eduExp = enableCrypto ? resumeCache.edu_exp : resume.edu_exp;
	
		// 求职意向 工作经历
		var content = '<div class="profile"><div class="profile-photo"><img src="' + resume.profile_photo + '"></div><div class="basic-info"><div class="full-name">' + resume.full_name + '</div><div class="basic-line basic-line-1"><span>' + resume.sex + '&nbsp;&nbsp;&nbsp;' + age + '岁&nbsp;&nbsp;&nbsp;现居' + resume.city + '&nbsp;&nbsp;&nbsp;' + resume.highest_edu + '&nbsp;&nbsp;&nbsp;' + workYears + '年工作经验</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-github icon-color" aria-hidden="true"></i> ' + resume.github + '</div><div class="basic-line basic-line-2"><i class="fa fa-phone icon-color" aria-hidden="true"></i> ' + phoneNumber + '&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-envelope icon-color" aria-hidden="true"></i> ' + resume.email + '&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-wechat icon-color" aria-hidden="true"></i> ' + wechat + '</div></div></div><div class="details"><div class="item"><div class="item-title"><img src="images/ico_career_objective.png">'
					+ '<span>求职意向</span></div><div class="item-line"></div><div class="item-detail"><i class="fa fa-tag icon-color" aria-hidden="true"></i> ' + resume.position_applied + '&emsp;&emsp;<i class="fa fa-map-marker icon-color" aria-hidden="true"></i> ' + resume.work_city + '</div></div><div class="item"><div class="item-title"><img src="images/ico_work_exp.png"><span>工作经历</span></div><div class="item-line"></div><div class="item-detail">';
		var workExp = resume.work_exp;
		for (var i in workExp) {
			content += '<div class="exp"><div class="date">' + workExp[i].form_date + '&nbsp;-&nbsp;' + workExp[i].to_date + '</div><div class="timeline-point"></div><div class="exp-title"><span class="exp-company"><i class="fa fa-building-o icon-color" aria-hidden="true"></i> ' + workExp[i].company + '</span><span class="exp-position"><i class="fa fa-tag icon-color" aria-hidden="true"></i> ' + workExp[i].position + ' &nbsp; <i class="fa fa-map-marker icon-color" aria-hidden="true"></i> ' + workExp[i].city + '</span></div></div>';
			if (workExp.length > 1 && i != workExp.length - 1) {
				content += '<div class="timeline"><div class="timeline-right has-timeline comment">' + workExp[i].description + '</div></div>';
			} else {
				content += '<div class="timeline"><div class="timeline-right no-timeline comment">' + workExp[i].description + '</div></div>';
			}
		}
	
		// 项目经历 (简约版)
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_project_exp.png"><span>项目经历</span></div><div class="item-line"></div><div class="item-detail">';
		var projectExp = resume.project_exp;
		for (var i in projectExp) {
			// 使用简约样式
			content += '<div class="project-item-compact">';
			// 项目标题和日期区域
			content += '<div class="project-header-compact">';
			content += '<div class="project-title-compact"><i class="fa fa-leaf icon-color" aria-hidden="true"></i> ' + projectExp[i].project_name + '<span class="project-position-compact"><i class="fa fa-tag icon-color" aria-hidden="true"></i> ' + projectExp[i].position + '</span></div>';
			content += '<div class="project-date-compact">' + projectExp[i].form_date + ' - ' + projectExp[i].to_date + '</div>';
			content += '</div>';

			// 项目描述
			content += '<div class="project-desc-compact">' + projectExp[i].description + '</div>';

			// 产品功能
			let projectFunctinListData = projectExp[i].function_list;
			if (isNotEmpty(projectFunctinListData)) {
				let projectFunctionList = '';
				for (let functionName in projectFunctinListData) {
					projectFunctionList += '<tr><th>' + functionName + "</th><td>" + projectFunctinListData[functionName] + "</td></tr>";
				}
				content += '<div class="project-subsection-compact"><div class="project-subtitle-compact"><i class="fa fa-solid fa-asterisk icon-color" aria-hidden="true"></i> 产品功能</div><table class="project-functions-compact">' + projectFunctionList + '</table></div>';
			}

			// 技术栈
			if (isNotEmpty(projectExp[i].technology_stack)) {
				content += '<div class="project-subsection-compact"><div class="project-subtitle-compact"><i class="fa fa-solid fa-asterisk icon-color" aria-hidden="true"></i> 技术栈</div><div class="project-technology-compact"><div class="tag-compact">' + projectExp[i].technology_stack.join('</div><div class="tag-compact">') + '</div></div></div>';
			}

			// 工作业绩
			if (isNotEmpty(projectExp[i].performance)) {
				content += '<div class="project-subsection-compact"><div class="project-subtitle-compact"><i class="fa fa-solid fa-asterisk icon-color" aria-hidden="true"></i> 工作业绩</div><ol class="project-performance-compact"><li>' + projectExp[i].performance.join("</li><li>") + '</li></ol></div>';
			}

			content += '</div>'; // 结束 project-item-compact
		}
	
		// 个人技能 教育经历
		let professionalSkills = '';
		if (isNotEmpty(resume.professional_skills)) {
			professionalSkills = '<ol class="professional-skills"><li>' + resume.professional_skills.join("</li><li>") + '</li></ol>';
		}
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_professional_skills.png"><span>个人技能</span></div><div class="item-line"></div><div class="item-detail">' + professionalSkills + '</div></div><div class="item"><div class="item-title"><img src="images/ico_edu_exp.png"><span>教育经历</span></div><div class="item-line"></div><div class="item-detail">';
		if (eduExp.length == 1) {
			content += '<div class="edu"><div class="date">' + eduExp[0].form_date + '&nbsp;-&nbsp;' + eduExp[0].to_date + '</div><div class="edu-detail"><i class="fa fa-university icon-color" aria-hidden="true"></i> ' + eduExp[0].school + '&emsp;&emsp;<i class="fa fa-book icon-color" aria-hidden="true"></i> ' + eduExp[0].major + '&emsp;&emsp;<i class="fa fa-certificate icon-color" aria-hidden="true"></i> ' + eduExp[0].degree + '</div></div>';
		} else {
			for (var i in eduExp) {
				content += '<div class="edu"><div class="date">' + eduExp[i].form_date + '&nbsp;-&nbsp;' + eduExp[i].to_date + '</div><div class="timeline-point"></div><div class="edu-detail"><i class="fa fa-university icon-color" aria-hidden="true"></i> ' + eduExp[i].school + '&emsp;&emsp;<i class="fa fa-book icon-color" aria-hidden="true"></i> ' + eduExp[i].major + '&emsp;&emsp;<i class="fa fa-certificate icon-color" aria-hidden="true"></i> ' + eduExp[i].degree + '</div></div>';
				if (eduExp.length > 1 && i != eduExp.length - 1) {
					content += '<div class="timeline"><div class="timeline-right space-timeline"></div></div>';
				}
			}
		}
	
		// 自我评价
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_self_evaluation.png"><span>自我评价</span></div><div class="item-line"></div><div class="item-detail">' + resume.self_evaluation + '</div></div></div>';
		
		$('#resume-content').html(content);
	}

	let p = getUrlParams()['p'];
	if (p) {
		let isSuccess = updateResumeCache(atob(p));
	}
	resumeRender();

	/************************* 监听事件 *************************/

	$('#lock-btn').on('click', function() {
		$('.popup-mask, .popup').show();
	});

	$('.ok-btn').on('click', function() {
		let $password = $('#password');
		let password = $password.val();
		if (!password) {
			$password.css('border-color', 'red');
			return;
		}
		let isSuccess = updateResumeCache(password);
		if (isSuccess) {
			closePasswordPopup();
			resumeRender();
			$('#copy-url-btn').data('p', btoa(password));
		}
	});

	$('.cancel-btn').on('click', function() {
		closePasswordPopup();
	});

	$('#password').on('blur', function() {
		let $password = $('#password');
		if (!$password.val()) {
			$password.css('border-color', 'red');
		} else {
			$password.css('border-color', 'gray');
		}
	});

	$('#copy-url-btn').on('click', function() {
		const url = new URL(window.location.href);
		const p = $(this).data('p');
		if (p) {
			url.searchParams.set('p', p);
		}
		copyToClipboard(url.toString());
	});

	$('#pdf-btn').on('mouseover', function() {
		$('.pdf-tips').show();
	});

	$('#pdf-btn').on('mouseout', function() {
		$('.pdf-tips').hide();
	});

	function updateResumeCache(password) {
		try {
			resumeCache.phone = CryptoJS.RC4.decrypt(resume.phone, password).toString(CryptoJS.enc.Utf8);
			resumeCache.wechat = CryptoJS.RC4.decrypt(resume.wechat, password).toString(CryptoJS.enc.Utf8);
			resumeCache.edu_exp = [];
			for (var i in resume.edu_exp) {
				let currEduExp = {};
				currEduExp.form_date = CryptoJS.RC4.decrypt(resume.edu_exp[i].form_date, password).toString(CryptoJS.enc.Utf8);
				currEduExp.to_date = CryptoJS.RC4.decrypt(resume.edu_exp[i].to_date, password).toString(CryptoJS.enc.Utf8);
				currEduExp.school = CryptoJS.RC4.decrypt(resume.edu_exp[i].school, password).toString(CryptoJS.enc.Utf8);
				currEduExp.major = CryptoJS.RC4.decrypt(resume.edu_exp[i].major, password).toString(CryptoJS.enc.Utf8);
				currEduExp.degree = CryptoJS.RC4.decrypt(resume.edu_exp[i].degree, password).toString(CryptoJS.enc.Utf8);
				resumeCache.edu_exp.push(currEduExp);
			}
			resumeCache.type = 'session';
			setCache('resume_cache', resumeCache);
			return true;
		} catch (err) {
			console.log(err);
			alert('密码错误');
			return false;
		}
	}

	function closePasswordPopup() {
		$('#password').val('').css('border-color', 'gray');
		$('.popup-mask, .popup').hide();
	}

	function getCache(key) {
		let _cache = localStorage.getItem(key);
		try {
			if (_cache) {
				_cache = JSON.parse(_cache);
				if (_cache.type === 'session' && _cache.time + 30 * 60 * 1000 > new Date().getTime()) {
					return _cache;
				}
			}
		} catch (err) {
			console.log('no cache');
		}
		localStorage.setItem(key, null);
		return null;
	}

	function setCache(key, value) {
		value.time = new Date().getTime();
		localStorage.setItem(key, JSON.stringify(value));
	}

	function getUrlParams() {
		const params = new URLSearchParams(window.location.search);
		const result = {};
		for (const [key, value] of params.entries()) {
		  result[key] = value;
		}
		return result;
	}

	function isNotEmpty(obj) {
		if (!obj) {
			return false;
		}
		if (typeof obj === 'array') {
			return obj.length > 0;
		}
		return Object.keys(obj).length > 0;
	}

	async function copyToClipboard(text) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (err) {
			console.error("复制网址失败:", err);
			return false;
		}
	}

});