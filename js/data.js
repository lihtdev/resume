// crypto_enabled 属性值为 true 时表示数据用 RC4 算法进行加密
// phone、 wechat 与 edu_exp 的属性值需要用 RC4 算法加密后填写
window.resume = {
	"crypto_enabled" : true,
	"full_name" : "李海涛",
	"sex" : "男",
	"birthday" : "1994-01-12",
	"city" : "南京",
	"highest_edu" : "本科",
	"work_date_from" : "2014-12-01",
	"work_date_to" : "2025-06-21",
	"phone" : "U2FsdGVkX1/wkkElHhOIzI/ALxag5uq9EmiF",
	"wechat": "U2FsdGVkX1+2BwaBV0gD3Dj6Dy/xQ3GgYYs6zNw=",
	"email" : "lihaitaomail@126.com",
	"github" : "https://github.com/lihtdev",
	"profile_photo" : "images/lihaitao.png",
	"position_applied" : "Java工程师",
	"work_city" : "南京",
	"work_exp" :
	[
		{
			"form_date" : "2021.09",
			"to_date" : "至今",
			"company" : "鼎捷软件股份有限公司江苏分公司",
			"position" : "资深Java工程师",
			"city" : "南京",
			"description" : "1. 负责鼎捷 PaaS 平台的微服务平台开发<br>2. 负责鼎捷 PaaS 平台的微服务编排系统开发<br>3. 负责鼎捷云开发者门户后端开发<br>4. 负责鼎捷 Athena 开发平台低代码模块后端开发"
		},
		{
			"form_date" : "2019.03",
			"to_date" : "2021.06",
			"company" : "江苏敏捷科技股份有限公司",
			"position" : "技术经理",
			"city" : "南京",
			"description" : "1. 担任技术经理，主导敏捷 DGS 数据安全卫士的管理推进、迭代规划、核心模块开发<br>2. 主导敏捷 DM 企业网盘的后端微服务架构设计、核心模块开发<br>3. 负责敏捷 Agile Platform 微服务平台开发"
		},
		{
			"form_date" : "2015.06",
			"to_date" : "2018.12",
			"company" : "神州数码（中国）有限公司",
			"position" : "Java工程师",
			"city" : "北京",
			"description" : "负责神州云计算的云市场、云防御项目的后端开发与前端 JavaScript 数据绑定"
		},
		{
			"form_date" : "2014.12",
			"to_date" : "2015.04",
			"company" : "北京北控伟仕软件工程技术有限公司",
			"position" : "Java工程师",
			"city" : "北京",
			"description" : "负责北京社会保险管理信息系统（五险系统）的前端开发和后端开发"
		}
	],
	"project_exp" :
	[
		{
			"form_date" : "2024.06",
			"to_date" : "2025.01",
			"project_name" : "AI语音交互虚拟数字人",
			"position" : "资深Java工程师",
			"description" : "本项目是一个高性能、高可用的AI虚拟数字人实时语音交互系统。项目核心是一个具备自然语言对话、情感化表情与动作的3D虚拟形象，用户可通过语音或文字与数字人进行沉浸式互动。系统采用C/S架构，我主要负责整个服务端的架构设计、开发与运维工作。客户端使用 Unity 引擎，负责 3D 数字人的渲染、动画驱动、音频播放及用户输入采集。服务端采用Java技术栈。",
			"function_list": {
				"实时通信服务": "基于 WebSocket 通信协议的自研网关服务，负责与 Unity 客户端的连接建立、心跳维护、消息路由与广播；用 HTTP 协议作辅助 API 及健康检查；实现连接池管理，支持横向扩展以应对高并发场景",
				"AI服务代理与编排": "语音识别（ASR）代理：接收客户端上传的语音流，调用阿里云/百度云等 ASR 服务，并返回文本结果。<br><br>自然语言处理（NLP）代理：集成大型语言模型（如 DeepSeek、阿里千问等），处理用户意图识别、对话生成、情感分析。<br><br>语音合成（TTS）代理：将 NLP 返回的答复文本，调用 TTS 服务合成情感化语音流，并返回给客户端。",
				"会话与上下文管理": "为每个用户会话创建独立的上下文 Context，采用 Redis 缓存最近N轮对话历史，确保数字人对话的连贯性",
				"数据持久化服务": "使用 MyBatis-Plus 对用户交互日志、数字人配置信息等进行持久化存储，便于后续数据分析与优化",
				"监控与管理后台": "提供简单的管理后台（Spring Boot Admin），监控服务健康状态、实时连接数、API 调用；集成 Sentinel 实现服务的熔断与降级，保证在 AI 服务不稳定时系统的整体韧性"
			},
			"technology_stack": ["Spring Boot", "Spring WebFlux", "Netty", "MyBatis-Plus", "MySQL", "Redis", "Nacos", "Sentinel", "RocketMQ"],
			"performance": [
				"性能优化：通过引入 Netty 重构 WebSocket 网关，并将阻塞式调用改为响应式编程（WebFlux），使服务端单机支持的长连接数从约1500提升至8000+，CPU 负载降低40%",
				"系统稳定性：设计并实现了服务熔断与降级机制（基于 Sentinel ）。当第三方 TTS 服务响应缓慢时，自动降级为仅返回文本信息，保障了核心对话功能的可用性，系统整体可用性提升至99.95%",
				"请求处理效率：通过连接池化管理和异步化处理（MQ）对第三方 AI API 的调用，减少了不必要的连接开销，并将 TTS 合成等耗时任务异步化，提升了请求响应速度，整体吞吐量提升至1000QPS+",
				"完整交付：独立负责了从技术选型、架构设计、数据库设计到核心编码、压力测试及最终上线部署的全流程，保证了项目的成功落地和稳定运行"
			]
		},
		{
			"form_date" : "2023.02",
			"to_date" : "2024.06",
			"project_name" : "鼎捷微服务平台·服务编排系统",
			"position" : "资深Java工程师",
			"description" : "鼎捷微服务编排系统具备将多种微服务整合到一个统一平台并进行编排的能力，它能够根据特定的业务流程来执行选定的微服务，并且还是一个功能强大的工作流引擎。",
			"function_list": {
				"工作台": "服务编排设计器，服务编排模板发布，服务编排模板运行，服务运行状态监控，应用参数管理，应用授权注册，应用日志",
				"控制台": "服务流程管理，历史事件查询，工作域管理，调度器执行策略，工作器执行策略，系统日志，运维中心",
				"调度器": "DSL 模板持久化，DSL 模板编译，服务编排实例初始化，任务列表绑定，工作器创建",
				"工作器": "HTTP 任务，ESP 任务，JavaScript 任务，子流程任务，判断流程，循环流程，分支流程，异步流程，定时流程，任务工作器，流程工作器",
				"执行引擎": "Cadence Server，流程控制引擎，任务调度引擎，服务调用组件，历史事件定时清理，流程执行数据统计"
			},
			"technology_stack": ["Spring Boot", "Spring Cloud", "Spring Security", "MyBatis", "MySQL", "Redis", "MongoDB", "RabbitMQ", "Seata", "Uber Cadence"],
			"performance": [
				"完成了服务编排系统的异常信息上报 IT 告警平台、Cadence 历史数据自动清理机制、复杂流程的大对象服务编排模板处理机制等功能的业务设计与开发",
				"解决了若干线上问题，如并行任务增加定时器后发生超时、JavaScript 任务不支持 ES6 语法、华为云测试区 scworker 内存频繁溢出等问题",
				"通过对服务编排系统各环节的性能调优，以及对 Cadence 服务的参数调优测试，提升了服务编排系统的水平扩容线性能力，多副本部署的线性系数提升到 1.6 以上，3个副本部署时并发U数由原来的 500U 提升至 800U",
				"定期产出服务编排核心API全链路压测性能报告",
				"完成了服务编排系统对信创平台的支持，适配了分布式数据库 OceanBase、应用服务器中间件 TongWeb、分布式数据缓存中间件 TongRDS、服务代理中间件 TongHttpServer 等国产数据库与中间件"
			]
		},
		{
			"form_date" : "2021.09",
			"to_date" : "2023.02",
			"project_name" : "鼎捷云·开发者门户",
			"position" : "资深Java工程师",
			"description" : "开发者门户是一个全流程、一站式的 SaaS 应用研发部署平台，开发者可以基于鼎捷云生态框架进行应用开发，然后在开发者工作台执行应用管理、打包、部署、测试、应用授权等一系列操作，最后让开发完成的应用在鼎捷云生态平台上线运行供租户使用。",
			"function_list": {
				"用户中心": "账号管理，企业管理，租户管理，用户管理，权限管理",
				"工作台": "应用管理，应用授权，OAuth 注册，应用测试，API 调试，应用日志",
				"发版管理": "应用团队，发版项目，发版计划，冲刺管制，需求管理，任务管理，Bug 管理，测试管理",
				"部署中心": "绑定 Git 代码库，应用部署申请，构建镜像任务，镜像管理，流水线部署，部署参数，部署状态监控",
				"运维中心": "监控大屏，系统日志，应用部署资源申请，云资源管理，镜像仓库管理，SQL脚本审核执行，服务异常告警",
				"社区": "论坛，问答，文章，自动内容审核，人工内容审核",
				"帮助中心": "提供开发者门户使用指导和技术支持，提供相关指南和常见问题解答"
			},
			"technology_stack": ["Spring Boot", "Spring Cloud", "Spring Security", "MyBatis", "MySQL", "Redis", "MongoDB", "RabbitMQ", "Seata", "XXL-JOB"],
			"performance": [
				"完成了 API 测试、发版管理、构建镜像任务、流水线部署、监控大屏、帮助中心等功能模块的后端业务设计与开发工作",
				"优化改进了鼎捷云后端项目部署的自动化脚本程序，简化了代码打包、部署、测试、上线的自动化流程，提高了团队开发效率",
				"完成了开发者门户后端微服务架构对信创平台的支持，适配了分布式数据库 OceanBase、应用服务器中间件 TongWeb、分布式数据缓存中间件 TongRDS、服务代理中间件 TongHttpServer 等国产数据库与中间件",
				"主导开发者门户后端开发进度推进，负责每个迭代研发需求的后端任务分解，后端团队成员的任务安排"
			]
		},
		{
			"form_date" : "2020.08",
			"to_date" : "2021.06",
			"project_name" : "敏捷科技·DGS数据安全卫士",
			"position" : "技术经理",
			"description" : "DGS 是一套数据安全管理一体化平台，采用全方位、全内容、全过程的数据管理与安全保护手段，通过智能安全分析技术、操作系统内核技术、高强度的透明加密技术、灵活易用的安全策略，为企业提供多重数据安全防护服务，有效地解决诸多数据安全隐患。",
			"function_list": {
				"基础平台": "用户管理，用户权限，功能授权，AD 域同步，流程管理，敏感词管理，全文检索，系统设置，终端管理，审计日志",
				"数据安全": "文件安全，文件外发，文件授权，打印安全，备份安全",
				"文件追溯": "屏幕溯源，文件溯源，打印溯源，移动端溯源，文件追踪",
				"数据防泄漏": "邮件管控，即时通讯管控，移动外设管控，文件操作管控，网络传输管控",
				"安全网关": "应用安全网关，加解密网关，邮件安全网关，数据脱敏网关"
			},
			"technology_stack": ["Spring Boot", "Spring Cloud Alibaba", "MyBatis Plus", "MySQL", "Redis", "Seata", "RabbitMQ", "Elasticsearch", "MinIO"],
			"performance": [
				"主导从 0 到 1 搭建了 DGS 数据安全卫士的微服务架构，完成了 DGS 1.0 单体架构到 DGS 2.0 微服务架构的升级改造",
				"主导对 DGS 的各业务模块进行了优化，对老旧代码进行重构，对部分业务接口进行性能优化，降低业务逻辑复杂性，确立了 DGS 产品整体的技术架构",
				"确立了 DGS 团队的工作流程、代码规范等，全面负责项目的管理推进、迭代规划及团队成员的工作任务安排，带领整个团队历时一年时间完成了多轮迭代开发，最终推出了首个可直接交付客户使用的 DGS 2.0 版本"
			]
		},
		{
			"form_date" : "2019.03",
			"to_date" : "2020.08",
			"project_name" : "敏捷科技·DM企业网盘",
			"position" : "Java工程师",
			"description" : "DM 是一套私有化部署的多人共享协作、文件极速传输、分布式安全存储、文档安全管理解决方案。",
			"function_list": {
				"文件管理": "上传和管理各类文件，包含个人文件库和企业文件库，支持标签、评论等功能",
				"协同高效": "支持文档内部共享和链接外发，同时支持在线预览、在线编辑功能",
				"智能搜索": "使用 ElasticSearch 智能搜索引擎，更加智能化、多元化",
				"权限管控": "完善的权限管理与安全机制，支持多层次颗粒度的权限控制",
				"外链分享": "提供文件分享外链地址，支持设置使用权限和阅读次数等",
				"海量存储": "提供 PB 级存储管理功能，支持分布式部署"
			},
			"technology_stack": ["Spring Boot", "Spring Cloud Alibaba", "MyBatis Plus", "MySQL", "Redis", "Seata", "RabbitMQ", "Elasticsearch", "MinIO"],
			"performance": [
				"参与了 Agile Platform 微服务平台的开发工作，如 AD 域同步、模块授权、终端升级等功能；并解决了微服务平台存在的若干疑难杂症，如内外网隔离时在线预览失败、配置中心全量同步失败、文件名带特殊字符时预览乱码、移动端预览不支持手势缩放等问题",
				"主导研发了 Agile Platform 微服务平台的一套 DevOps 开发运维一体化平台，并构建了从研发到运维的标准化流程",
				"主导 DM 企业网盘的微服务架构设计，完成了 DM 1.0 单体架构到 DM 2.0 微服务架构的升级改造，并参与了文件管理、智能搜索等核心业务模块的设计与开发工作"
			]
		}
	],
	"professional_skills" : [
		"有多年 Java 后端开发经验，掌握 Java 语言特性与常用设计模式，了解 JVM 调优、并发与多线程等技术",
		"熟悉常用开源框架的实现原理及设计思想，如 Spring Framework、Spring Boot、SpringSecurity、MyBatis 等，并熟练掌握 MyBatis-Plus、Sa-Token 等框架的使用",
		"熟悉 MySQL 海量数据存储及其性能优化，掌握 MySQL 运行机制、存储引擎、索引、事务和锁等机制，了解 MySQL 的分库分表、主从模式、双主模式等集群架构设计，熟悉数据库中间件 ShardingSphere 的使用",
		"熟悉大型分布式系统架构设计，掌握分布式锁、分布式事务、分布式任务调度、分布式 Session 和分布式 ID 等常用分布式解决方案；熟悉微服务架构设计，理解服务注册发现、配置中心、API 网关、负载均衡、服务通信、限流、熔断、降级以及链路追踪等机制，并掌握 Spring Cloud、Spring Cloud Alibaba、Dubbo 等微服务框架的使用",
		"熟悉高性能分布式缓存 (Redis)、分布式消息服务中间件 (RabbitMQ, RocketMQ, Kafka)、分布式搜索引擎 (Elasticsearch) 及海量日志分析平台（ELK）等架构的应用",
		"熟悉 Web 容器与代理（Tomcat, Nginx）、JVM 相关 (JMC, jstack, jmap, jstat, btrace, MAT)、Linux 系统分析 (vmstat, iostat & iotop, ifstat & iftop, netstat, dstat, strace) 等常用工具集"
	],
	"edu_exp" :
	[
		{
			"form_date" : "U2FsdGVkX1+qMR0+DRJEm7n0PGgwlwg=",
			"to_date" : "U2FsdGVkX19fcEfBKT/Gf3XIa+UF59g=",
			"school" : "U2FsdGVkX1/AU+G7TIFmQ9LgkcK01zoSAELHE6g8laVnKA==",
			"major" : "U2FsdGVkX19u5JnEuvjPMUJkPCCunEHz4kz9Hv0hux213Oc5Cw==",
			"degree" : "U2FsdGVkX19ooN5MdRPqCQokmpFVkE5GLKwUxTIr36pqlg=="
		},
		{
			"form_date" : "U2FsdGVkX1+qMR0+DRJEm7n0PGgwlwg=",
			"to_date" : "U2FsdGVkX1/2J1wSSa5Zo5gwE2CexRA=",
			"school" : "U2FsdGVkX1/AU+G7TIFmQ9LgkcK01zoSAELHE6g8laVnKA==",
			"major" : "U2FsdGVkX1+RHCVibksJKaAoM/Cb/WB5nljmzBQ2RnZikc7o4w==",
			"degree" : "U2FsdGVkX1+6K0k9lGa2EET3d++Z9iBqpIMKoBXpD5/aoQ=="
		}
	],
	"self_evaluation" : "我是一名有丰富实战经验的 Java 后端工程师，多年深耕技术，熟悉 Java 开发全流程，能高效完成编码与调试工作，也了解产品技术架构设计，曾解决接口性能优化、内存频繁溢出、复杂业务架构设计等各类问题。注重团队协作，愿以真诚态度和持续学习，为团队和项目发展贡献自己的力量。",
	"aiCapability" : {
		"title" : "AI 开发能力",
		"subhead" : "近 6 个月 · 价值 / 效率 / 编排",
		"labels" : ["10月", "11月", "12月", "1月", "2月", "3月"],
		"heroMetric" : {
			"name" : "Token ROI (投资回报率)",
			"subtitle" : "AI 创造的实际价值",
			"unit" : "回报指数",
			"values" : [1.2, 1.4, 1.7, 2.0, 2.2, 2.5],
			"currentValue" : 2.5,
			"baselineValue" : 1.2,
			"peakValue" : 2.5,
			"benchmarkValue" : 2.0,
			"deltaValue" : "+108%",
			"deltaLabel" : "较基线",
			"summaryTags" : ["价值", "效率", "产出"],
			"quantMethod" : "ROI指数 = AI产出价值 ÷ Token消耗成本",
			"callouts" : [
				{ "index" : 3, "label" : "2.0 参考线" },
				{ "index" : 5, "label" : "2.5 峰值" }
			]
		},
		"sideMetrics" : [
			{
				"name" : "Token 消耗量",
				"subtitle" : "AI 工具的使用频率和深度",
				"unit" : "千 Tokens",
				"values" : [42, 50, 48, 61, 58, 66],
				"currentValue" : 66,
				"avgValue" : 54,
				"peakValue" : 66,
				"baselineValue" : 42,
				"deltaValue" : "+24k",
				"deltaLabel" : "6个月 Δ",
				"miniStats" : [
					{ "label" : "均值", "value" : "54k" },
					{ "label" : "峰值", "value" : "66k" },
					{ "label" : "增幅", "value" : "+24k" }
				],
				"quantMethod" : "每月统计：各AI模型API调用的Token消耗总和",
				"callouts" : [
					{ "index" : 3, "label" : "61k" },
					{ "index" : 5, "label" : "66k" }
				]
			},
			{
				"name" : "智能体编排能力",
				"subtitle" : "协调 AI 智能体解决复杂问题的能力",
				"unit" : "能力指数",
				"values" : [46, 53, 60, 68, 75, 83],
				"currentValue" : 83,
				"avgValue" : 64,
				"peakValue" : 83,
				"baselineValue" : 46,
				"deltaValue" : "+37",
				"deltaLabel" : "6个月 Δ",
				"miniStats" : [
					{ "label" : "均值", "value" : "64" },
					{ "label" : "峰值", "value" : "83" },
					{ "label" : "增幅", "value" : "+37" }
				],
				"quantMethod" : "能力指数 = 任务复杂度 × 智能体数量 × 成功率",
				"callouts" : [
					{ "index" : 2, "label" : "60" },
					{ "index" : 5, "label" : "83" }
				]
			}
		],
		"statStrip" : [
			{ "label" : "回报增幅", "value" : "+108%" },
			{ "label" : "回报峰值", "value" : "2.50" },
			{ "label" : "月均 Token", "value" : "54k" },
			{ "label" : "编排峰值", "value" : "83" },
			{ "label" : "观察窗口", "value" : "6个月" }
		],
		"note" : "成本倒逼效率：追求 Token ROI 最大化"
	}
};
