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
	var workDateTo = today;
	var workDateToYear = thisYear;
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
		var eduExp = enableCrypto ? resumeCache.edu_exp : resume.edu_exp;
	
		// 求职意向 工作经历
		var content = '<div class="profile"><div class="profile-photo"><img src="' + resume.profile_photo + '"></div><div class="basic-info"><div class="full-name">' + resume.full_name + '</div><div><span>' + resume.sex + '&nbsp;&nbsp;</span><span>' + age + '&nbsp;&nbsp;</span><span>' + resume.city + '&nbsp;&nbsp;</span><span style="color:#bbb">|&nbsp;&nbsp;</span><span>' + resume.highest_edu + '&nbsp;&nbsp;</span><span>' + workYears + '年工作经验</span></div><div><i class="fa fa-mobile icon-color font-16px" aria-hidden="true"></i> <span>' + phoneNumber + '&nbsp;&nbsp;</span><i class="fa fa-envelope-o icon-color" aria-hidden="true"></i> <span>' + resume.email + '&nbsp;&nbsp;</span><i class="fa fa-github icon-color" aria-hidden="true"></i> <span>' + resume.github + '</span></div></div></div><div class="details"><div class="item"><div class="item-title"><img src="images/ico_career_objective.png">'
					+ '<span>求职意向</span></div><div class="item-line"></div><div class="item-detail"><i class="fa fa-tag icon-color" aria-hidden="true"></i> ' + resume.position_applied + '&emsp;&emsp;<i class="fa fa-map-marker icon-color" aria-hidden="true"></i> ' + resume.work_city + '</div></div><div class="item"><div class="item-title"><img src="images/ico_work_exp.png"><span>工作经历</span></div><div class="item-line"></div><div class="item-detail">';
		var workExp = resume.work_exp;
		for (var i in workExp) {
			content += '<div class="exp"><div class="date">' + workExp[i].form_date + '&nbsp;-&nbsp;' + workExp[i].to_date + '</div><div class="timeline-point">';
			if (workExp.length > 1 && i == 0) {
				content += '<img class="timeline-top-img" src="images/timeline_top.png">';
			} else if (workExp.length > 1 && i != 0) {
				content += '<img class="timeline-bottom-img" src="images/timeline_bottom.png">';
			}
			content += '</div><div class="exp-title"><i class="fa fa-building-o icon-color" aria-hidden="true"></i> ' + workExp[i].company + '&nbsp;&nbsp;<i class="fa fa-tag icon-color" aria-hidden="true"></i> ' + workExp[i].position + '&nbsp;&nbsp;<i class="fa fa-map-marker icon-color" aria-hidden="true"></i> ' + workExp[i].city + '</div></div>';
			if (workExp.length > 1 && i != workExp.length - 1) {
				content += '<div class="timeline"><div class="timeline-right has-timeline comment">' + workExp[i].description + '</div></div>';
			} else {
				content += '<div class="timeline"><div class="timeline-right no-timeline comment">' + workExp[i].description + '</div></div>';
			}
		}
	
		// 项目经历
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_project_exp.png"><span>项目经历</span></div><div class="item-line"></div><div class="item-detail">';
		var projectExp = resume.project_exp;
		for (var i in projectExp) {
			content += '<div class="exp"><div class="date">' + projectExp[i].form_date + '&nbsp;-&nbsp;' + projectExp[i].to_date + '</div><div class="timeline-point">';
			if (projectExp.length > 1 && i == 0) {
				content += '<img class="timeline-top-img" src="images/timeline_top.png">';
			} else if (projectExp.length > 1 && i != 0) {
				content += '<img class="timeline-bottom-img" src="images/timeline_bottom.png">';
			}
			content += '</div><div class="exp-title"><i class="fa fa-leaf icon-color" aria-hidden="true"></i> ' + projectExp[i].project_name + '&nbsp;&nbsp;<i class="fa fa-tag icon-color" aria-hidden="true"></i> ' + projectExp[i].position + '</div></div>';
			let projectDetail = '<div class="project-desc">' + projectExp[i].description + '</div>';
			let projectFunctinListData = projectExp[i].function_list;
			if (isNotEmpty(projectFunctinListData)) {
				let projectFunctionList = '';
				for (let functionName in projectFunctinListData) {
					projectFunctionList += '<tr><th>' + functionName + "</th><td>" + projectFunctinListData[functionName] + "</td></tr>";
				}
				projectDetail += '<div class="project-item"><div class="project-item-title"><i class="fa fa-solid fa-asterisk icon-color" aria-hidden="true"></i> 产品功能</div><table class="project-functions">' + projectFunctionList + '</table></div>';
			}
			if (isNotEmpty(projectExp[i].technology_stack)) {
				projectDetail += '<div class="project-item"><div class="project-item-title"><i class="fa fa-solid fa-asterisk icon-color" aria-hidden="true"></i> 技术栈</div><div class="project-technology"><div class="tag">' + projectExp[i].technology_stack.join('</div><div class="tag">') + '</div></div></div>';
			}
			if (isNotEmpty(projectExp[i].performance)) {
				projectDetail += '<div class="project-item"><div class="project-item-title"><i class="fa fa-solid fa-asterisk icon-color" aria-hidden="true"></i> 工作业绩</div><ol class="project-performance"><li>' + projectExp[i].performance.join("</li><li>") + '</li></ol></div>';
			}
			if (projectExp.length > 1 && i != projectExp.length - 1) {
				content += '<div class="timeline"><div class="timeline-right has-timeline">' + projectDetail + '</div></div>';
			} else {
				content += '<div class="timeline"><div class="timeline-right no-timeline">' + projectDetail + '</div></div>';
			}
		}
	
		// 个人技能 教育经历
		let professionalSkills = '';
		if (isNotEmpty(resume.professional_skills)) {
			professionalSkills = '<ol class="professional-skills"><li>' + resume.professional_skills.join("</li><li>") + '</li></ol>';
		}
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_professional_skills.png"><span>个人技能</span></div><div class="item-line"></div><div class="item-detail">' + professionalSkills + '</div></div><div class="item"><div class="item-title"><img src="images/ico_edu_exp.png"><span>教育经历</span></div><div class="item-line"></div><div class="item-detail">';
		for (var i in eduExp) {
			content += '<div class="edu"><div class="date">' + eduExp[i].form_date + '&nbsp;-&nbsp;' + eduExp[i].to_date + '</div><div class="timeline-point">';
			if (eduExp.length > 1 && i == 0) {
				content += '<img class="timeline-top-img" src="images/timeline_top.png">';
			} else if (eduExp.length > 1 && i != 0) {
				content += '<img class="timeline-bottom-img" src="images/timeline_bottom.png">';
			}
			content += '</div><div class="edu-detail"><i class="fa fa-university icon-color" aria-hidden="true"></i> ' + eduExp[i].school + '&emsp;&emsp;<i class="fa fa-book icon-color" aria-hidden="true"></i> ' + eduExp[i].major + '&emsp;&emsp;<i class="fa fa-certificate icon-color" aria-hidden="true"></i> ' + eduExp[i].degree + '</div></div>';
			if (eduExp.length > 1 && i != eduExp.length - 1) {
				content += '<div class="timeline"><div class="timeline-right space-timeline"></div></div>';
			}
		}
	
		// 自我评价
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_self_evaluation.png"><span>自我评价</span></div><div class="item-line"></div><div class="item-detail">' + resume.self_evaluation + '</div></div></div>';
		
		$('#resume-content').html(content);
	}

	let p = getUrlParams()['p'];
	if (p) {
		let isSuccess = updateResumeCache(p);
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
			return;
		}
		let isSuccess = updateResumeCache(password);
		if (isSuccess) {
			closePasswordPopup();
			resumeRender();
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

	$('#pdf-btn').on('mouseover', function() {
		$('.pdf-tips').show();
	});

	$('#pdf-btn').on('mouseout', function() {
		$('.pdf-tips').hide();
	});

	function updateResumeCache(password) {
		try {
			resumeCache.phone = CryptoJS.RC4.decrypt(resume.phone, password).toString(CryptoJS.enc.Utf8);
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

});