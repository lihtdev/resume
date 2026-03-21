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

	function formatChartValue(value) {
		if (value === null || value === undefined || value === '') {
			return '';
		}
		if (typeof value === 'number') {
			if (Math.floor(value) !== value) {
				return value.toFixed(1);
			}
			return String(value);
		}
		return String(value);
	}

	function getMaxPoint(values) {
		var maxValue = Math.max.apply(null, values);
		for (var i = 0; i < values.length; i++) {
			if (values[i] === maxValue) {
				return { index: i, value: maxValue };
			}
		}
		return { index: 0, value: values[0] };
	}

	function createLineChartSvg(labels, values, options) {
		options = options || {};
		var width = options.width || 640;
		var height = options.height || 180;
		var paddingTop = options.paddingTop || 16;
		var paddingRight = options.paddingRight || 20;
		var paddingBottom = options.paddingBottom || 28;
		var paddingLeft = options.paddingLeft || 12;
		var chartWidth = width - paddingLeft - paddingRight;
		var chartHeight = height - paddingTop - paddingBottom;
		var min = Math.min.apply(null, values);
		var max = Math.max.apply(null, values);
		if (min === max) {
			min = min - 1;
			max = max + 1;
		}
		var stepX = values.length > 1 ? chartWidth / (values.length - 1) : chartWidth;
		var points = [];
		for (var i = 0; i < values.length; i++) {
			var x = paddingLeft + stepX * i;
			var normalized = (values[i] - min) / (max - min);
			var y = paddingTop + chartHeight - normalized * chartHeight;
			points.push({ x: x, y: y, value: values[i], label: labels[i] || '' });
		}
		var polylinePoints = '';
		for (var j = 0; j < points.length; j++) {
			polylinePoints += points[j].x + ',' + points[j].y;
			if (j !== points.length - 1) {
				polylinePoints += ' ';
			}
		}
		var areaPoints = paddingLeft + ',' + (paddingTop + chartHeight) + ' ' + polylinePoints + ' ' + (paddingLeft + chartWidth) + ',' + (paddingTop + chartHeight);
		var gridSvg = '';
		for (var g = 0; g < 3; g++) {
			var gridY = paddingTop + chartHeight * g / 2;
			gridSvg += '<line class="ai-chart-grid" x1="' + paddingLeft + '" y1="' + gridY + '" x2="' + (paddingLeft + chartWidth) + '" y2="' + gridY + '"></line>';
		}
		var benchmarkSvg = '';
		if (options.benchmarkValue !== undefined && options.benchmarkValue !== null && options.benchmarkValue !== '') {
			var benchmarkNormalized = (options.benchmarkValue - min) / (max - min);
			var benchmarkY = paddingTop + chartHeight - benchmarkNormalized * chartHeight;
			benchmarkSvg = '<line class="ai-chart-benchmark" x1="' + paddingLeft + '" y1="' + benchmarkY + '" x2="' + (paddingLeft + chartWidth) + '" y2="' + benchmarkY + '"></line>';
			if (options.showBenchmarkLabel !== false) {
				benchmarkSvg += '<text class="ai-chart-benchmark-label" x="' + (paddingLeft + 2) + '" y="' + (benchmarkY - 6) + '">参考线 ' + formatChartValue(options.benchmarkValue) + '</text>';
			}
		}
		var labelsSvg = '';
		for (var l = 0; l < points.length; l++) {
			labelsSvg += '<text class="ai-chart-label" x="' + points[l].x + '" y="' + (height - 8) + '" text-anchor="middle">' + points[l].label + '</text>';
		}
		var calloutSvg = '';
		var callouts = options.callouts || [];
		for (var c = 0; c < callouts.length; c++) {
			var callout = callouts[c];
			var calloutPoint = points[callout.index];
			if (!calloutPoint) {
				continue;
			}
			var offsetY = calloutPoint.y < paddingTop + chartHeight / 2 ? 18 : -12;
			calloutSvg += '<text class="ai-chart-callout" x="' + calloutPoint.x + '" y="' + (calloutPoint.y + offsetY) + '" text-anchor="middle">' + callout.label + '</text>';
		}
		var lastPoint = points[points.length - 1];
		var firstPoint = points[0];
		var peakPointMeta = getMaxPoint(values);
		var peakPoint = points[peakPointMeta.index];
		var endValueLabel = '';
		if (options.showEndValue !== false) {
			endValueLabel = '<text class="ai-chart-end-value" x="' + (lastPoint.x - 2) + '" y="' + (lastPoint.y - 10) + '" text-anchor="end">' + formatChartValue(lastPoint.value) + '</text>';
		}
		var peakMarker = '';
		if (peakPoint) {
			peakMarker = '<circle class="ai-chart-point ai-chart-point-peak" cx="' + peakPoint.x + '" cy="' + peakPoint.y + '" r="5.2"></circle>';
		}
		return '<svg class="ai-chart-svg" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" aria-hidden="true">'
			+ gridSvg
			+ benchmarkSvg
			+ '<polyline class="ai-chart-area" points="' + areaPoints + '"></polyline>'
			+ '<polyline class="ai-chart-line" points="' + polylinePoints + '"></polyline>'
			+ '<circle class="ai-chart-point ai-chart-point-start" cx="' + firstPoint.x + '" cy="' + firstPoint.y + '" r="3.5"></circle>'
			+ peakMarker
			+ '<circle class="ai-chart-point ai-chart-point-end" cx="' + lastPoint.x + '" cy="' + lastPoint.y + '" r="4.5"></circle>'
			+ endValueLabel
			+ calloutSvg
			+ labelsSvg
			+ '</svg>';
	}

	function renderMiniStats(miniStats) {
		if (!isNotEmpty(miniStats)) {
			return '';
		}
		var html = '<div class="ai-mini-stats">';
		for (var i = 0; i < miniStats.length; i++) {
			html += '<div class="ai-mini-stat"><span class="ai-mini-stat-label">' + miniStats[i].label + '</span><span class="ai-mini-stat-value">' + miniStats[i].value + '</span></div>';
		}
		html += '</div>';
		return html;
	}

	function renderStatStrip(statStrip) {
		if (!isNotEmpty(statStrip)) {
			return '';
		}
		var html = '<div class="ai-stat-strip">';
		for (var i = 0; i < statStrip.length; i++) {
			html += '<div class="ai-stat-chip"><span class="ai-stat-chip-value">' + statStrip[i].value + '</span><span class="ai-stat-chip-label">' + statStrip[i].label + '</span></div>';
		}
		html += '</div>';
		return html;
	}

	function renderSummaryMeta(metric) {
		var meta = [];
		if (metric.deltaValue) {
			meta.push('<div class="ai-chart-summary-meta-item"><span class="ai-chart-summary-meta-label">' + (metric.deltaLabel || 'Δ') + '</span><span class="ai-chart-summary-meta-value">' + metric.deltaValue + '</span></div>');
		}
		if (metric.peakValue !== undefined && metric.peakValue !== null && metric.peakValue !== '') {
			meta.push('<div class="ai-chart-summary-meta-item"><span class="ai-chart-summary-meta-label">' + metric.peakLabel + '</span><span class="ai-chart-summary-meta-value">' + formatChartValue(metric.peakValue) + '</span></div>');
		}
		if (!meta.length) {
			return '';
		}
		return '<div class="ai-chart-summary-meta">' + meta.join('') + '</div>';
	}


	function renderAiCapabilitySection(aiCapability) {
		if (!aiCapability) {
			return '';
		}
		var labels = aiCapability.labels || [];
		var heroMetric = aiCapability.heroMetric || {};
		var sideMetrics = aiCapability.sideMetrics || [];
		var statStrip = aiCapability.statStrip || [];
		if (!isNotEmpty(labels) || !isNotEmpty(heroMetric.values)) {
			return '';
		}
		var heroChart = createLineChartSvg(labels, heroMetric.values || [], {
			width: 656,
			height: 216,
			paddingTop: 18,
			paddingRight: 28,
			paddingBottom: 34,
			paddingLeft: 14,
			benchmarkValue: heroMetric.benchmarkValue,
			callouts: heroMetric.callouts || []
		});
		var sideCards = '';
		for (var i = 0; i < sideMetrics.length; i++) {
			var metric = sideMetrics[i];
			sideCards += '<div class="ai-chart-card ai-chart-card-secondary"><div class="ai-chart-head"><div class="ai-chart-title-group"><div class="ai-chart-title">' + metric.name + '</div><div class="ai-chart-subtitle">' + metric.subtitle + '</div></div><div class="ai-chart-summary ai-chart-summary-secondary"><div class="ai-chart-summary-main">' + formatChartValue(metric.currentValue) + '</div><div class="ai-chart-summary-unit">' + metric.unit + '</div></div></div><div class="ai-chart-wrap ai-chart-wrap-secondary">' + createLineChartSvg(labels, metric.values || [], { width: 312, height: 144, paddingTop: 16, paddingRight: 20, paddingBottom: 30, paddingLeft: 10, callouts: metric.callouts || [], showBenchmarkLabel: false }) + '</div>' + renderMiniStats(metric.miniStats || []) + '</div>';
		}
		var heroTags = '';
		if (isNotEmpty(heroMetric.summaryTags)) {
			heroTags = '<div class="ai-chart-tags"><span>' + heroMetric.summaryTags.join('</span><span>') + '</span></div>';
		}
		return '<div class="item item-ai-capability"><div class="item-title"><i class="fa fa-line-chart icon-color" aria-hidden="true"></i><span>' + aiCapability.title + '</span></div><div class="item-line"></div><div class="item-detail"><div class="ai-capability-subhead">' + aiCapability.subhead + '</div><div class="ai-chart-card ai-chart-card-hero"><div class="ai-chart-head ai-chart-head-hero"><div class="ai-chart-title-group"><div class="ai-chart-title">' + heroMetric.name + '</div><div class="ai-chart-subtitle">' + heroMetric.subtitle + '</div></div><div class="ai-chart-summary ai-chart-summary-hero"><div class="ai-chart-summary-main">' + formatChartValue(heroMetric.currentValue) + '</div><div class="ai-chart-summary-unit">' + heroMetric.unit + '</div>' + renderSummaryMeta(heroMetric) + '</div></div><div class="ai-chart-wrap ai-chart-wrap-hero">' + heroChart + '</div>' + heroTags + '</div><div class="ai-side-charts">' + sideCards + '</div>' + renderStatStrip(statStrip) + '</div></div>';
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
		content += '</div></div><div class="item"><div class="item-title"><img src="images/ico_self_evaluation.png"><span>自我评价</span></div><div class="item-line"></div><div class="item-detail">' + resume.self_evaluation + '</div></div>';

		// AI 开发能力
		content += renderAiCapabilitySection(resume.aiCapability) + '</div>';
		
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