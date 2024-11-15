// crypto_enabled 属性值为 true 时表示数据用 RC4 算法进行加密
// phone 与 edu_exp 的属性值需要用 RC4 算法加密后填写
window.resume = {
	"crypto_enabled" : true,
	"full_name" : "李海涛",
	"sex" : "男",
	"birthday" : "1994-01-12",
	"city" : "南京",
	"highest_edu" : "本科",
	"work_date_from" : "2015-02-01",
	"phone" : "U2FsdGVkX1/wkkElHhOIzI/ALxag5uq9EmiF",
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
			"description" : "1. 负责鼎捷 PaaS 微服务平台开发<br>2. 负责鼎捷 PaaS 微服务编排系统开发<br>3. 负责鼎捷云开发者门户后端开发<br>4. 负责鼎捷 Athena 开发平台低代码模块后端开发"
		},
		{
			"form_date" : "2019.03",
			"to_date" : "2021.06",
			"company" : "江苏敏捷科技股份有限公司",
			"position" : "技术经理",
			"city" : "南京",
			"description" : "1. 担任技术经理，负责敏捷 DGS 安全卫士的管理推进、迭代规划、核心模块开发<br>2. 主导敏捷 DM 企业网盘的后端微服务架构搭建、核心模块开发<br>3. 参与敏捷 Agile Platform 微服务平台开发"
		},
		{
			"form_date" : "2016.03",
			"to_date" : "2018.08",
			"company" : "神州数码（中国）有限公司",
			"position" : "Java工程师",
			"city" : "北京",
			"description" : "负责神州云计算 Marketplace 项目（云市场）的后端开发与前端 JavaScript 数据绑定"
		},
		{
			"form_date" : "2015.02",
			"to_date" : "2016.02",
			"company" : "北京北控伟仕软件工程技术有限公司",
			"position" : "Java工程师",
			"city" : "北京",
			"description" : "负责北京社会保险管理信息系统（五险系统）的前后端开发"
		}
	],
	"project_exp" :
	[
		{
			"form_date" : "2022.10",
			"to_date" : "2023.06",
			"project_name" : "鼎捷微服务平台·服务编排系统",
			"position" : "资深Java工程师",
			"description" : "鼎捷微服务编排系统具备将多种微服务整合到一个统一平台并进行编排的能力，它能够根据特定的业务流程来执行选定的微服务，并且还是一个功能强大的工作流引擎。",
			"function_list": {
				"工作台": "服务编排设计器，服务编排发布，服务编排运行，服务运行状态，应用参数管理，应用授权注册，应用日志",
				"控制台": "服务流程管理，历史事件查询，工作域管理，调度器执行策略，工作器执行策略，系统日志，运维中心",
				"服务调度器": "DSL模板持久化，DSL模板编译，服务编排实例初始化，任务列表绑定，服务工作器创建",
				"服务工作器": "流程工作器，任务工作器，HTTP任务，ESP任务，JavaScript任务，子流程任务",
				"服务执行引擎": "Cadence"
			},
			"technology_stack": ["Spring Boot", "Uber Cadence", "Digiwin Gateway", "Digiwin Service", "MySQL", "Redis", "MongoDB", "RabbitMQ"],
			"performance": [
				"完成了服务编排系统的异常信息上报IT告警平台、Cadence历史数据自动清理机制、复杂流程的大对象服务编排模板处理机制等功能的业务设计与开发",
				"解决了若干线上问题，如并行任务增加定时器后发生超时、JavaScript 任务不支持 ES6 语法、华为云测试区 scworker 内存频繁溢出等问题",
				"历时一个月时间，通过对服务编排系统各环节的性能调优，以及对 Cadence 服务的参数调优测试，提升了服务编排系统的水平扩容线性能力，多副本部署的线性系数提升到 1.6 以上，3个副本部署时并发U数由原来的 500U 提升至 800U",
				"定期产出服务编排核心API全链路压测性能报告",
				"完成了服务编排系统对信创平台的支持，适配了分布式数据库 OceanBase、应用服务器中间件 TongWeb、分布式数据缓存中间件 TongRDS、服务代理中间件 TongHttpServer 等国产数据库与中间件"
			]
		},
		{
			"form_date" : "2021.09",
			"to_date" : "2022.10",
			"project_name" : "鼎捷云·开发者门户",
			"position" : "资深Java工程师",
			"description" : "开发者门户是一个全流程、一站式的 saas 应用研发部署平台，开发者可以基于鼎捷云生态框架进行应用开发，然后在开发者工作台执行应用管理/打包/部署/测试/应用授权等一系列操作，最后让开发完成的应用在鼎捷云生态平台上线运行供租户使用。",
			"function_list": {
				"用户中心": "我的账号，订单管理，权限管理，用户管理，我的企业，我的应用",
				"工作台": "应用管理，应用授权，租户管理，OAuth注册，API测试，测试管理，应用日志",
				"发版管理": "应用团队，发版项目，发版计划，冲刺管制",
				"部署中心": "云资源管理，镜像仓库管理，Git绑定，部署专案申请，构建镜像任务，镜像管理，流水线部署，部署参数",
				"运维中心": "监控大屏，系统日志",
				"社区": "论坛，问答，文章，内容审核",
				"帮助中心": "提供开发者门户使用指导和技术支持，提供相关指南和常见问题解答"
			},
			"technology_stack": ["Spring Boot", "Digiwin Gateway", "Digiwin Service", "Diginwin Dao", "Digiwin Schedule", "MySQL", "Redis", "RabbitMQ"],
			"performance": [
				"完成了API测试、发版管理、构建镜像任务、流水线部署、监控大屏、帮助中心等功能模块的后端业务设计与开发工作",
				"优化改进了鼎捷云后端项目部署的自动化脚本程序，简化了代码打包、部署、测试、上线的自动化流程，提高了团队开发效率",
				"完成了开发者门户后端微服务架构对信创平台的支持，适配了分布式数据库 OceanBase、应用服务器中间件 TongWeb、分布式数据缓存中间件 TongRDS、服务代理中间件 TongHttpServer 等国产数据库与中间件",
				"主导开发者门户后端项目推进，负责每个迭代研发需求的后端任务分解，后端团队成员的任务安排"
			]
		},
		{
			"form_date" : "2020.08",
			"to_date" : "2021.06",
			"project_name" : "敏捷科技·DGS数据安全卫士",
			"position" : "技术经理",
			"description" : "DGS 是一套数据安全管理一体化平台，采用全方位、全内容、全过程的数据管理与安全保护手段，通过智能安全分析技术、操作系统内核技术、高强度的透明加密技术、灵活易用的安全策略，为企业提供多重数据安全防护服务，有效地解决诸多数据安全隐患。",
			"function_list": {
				"基础平台": "用户管理，用户权限，功能授权，AD域同步，流程管理，敏感词管理，全文检索，系统设置，终端管理，审计日志",
				"数据安全": "文件安全，文件外发，文件授权，打印安全，备份安全",
				"文件追溯": "屏幕溯源，文件溯源，打印溯源，移动端溯源，文件追踪",
				"数据防泄漏": "邮件管控，即时通讯管控，移动外设管控，文件操作管控，网络传输管控",
				"安全网关": "应用安全网关，加解密网关，邮件安全网关，数据脱敏网关"
			},
			"technology_stack": ["Spring Boot", "Spring Cloud Alibaba", "MyBatis", "MySQL", "Redis", "RabbitMQ", "Elasticsearch", "MinIO"],
			"performance": [
				"主导从 0 到 1搭建了 DGS 数据安全卫士的微服务架构，完成了 DGS 1.0 单体架构到 DGS 2.0 微服务架构的升级改造",
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
			"technology_stack": ["Spring Boot", "Spring Cloud Alibaba", "MyBatis", "MySQL", "Redis", "RabbitMQ", "Elasticsearch", "MinIO"],
			"performance": [
				"参与了 Agile Platform 微服务平台的开发工作，如AD域同步、模块授权、终端升级等功能；并解决了微服务平台存在的若干疑难杂症，如内外网隔离时在线预览失败、配置中心全量同步失败、文件名带特殊字符时预览乱码、移动端预览不支持手势缩放等问题",
				"主导研发了 Agile Platform 微服务平台的一套 DevOps 开发运维一体化平台，并构建了从研发到运维的标准化流程",
				"主导从 0 到 1 搭建了 DM 企业网盘的微服务架构，并参与了核心业务模块的设计与开发工作"
			]
		}
	],
	"professional_skills" : [
		"有多年 Java 后端开发经验，掌握 Java 语言特性与常用设计模式，了解 JVM 调优、并发与多线程等技术",
		"熟悉常用开源框架的实现原理及设计思想，如 Spring Framework、Spring Boot、Spring Cloud、MyBatis 等，并熟练掌握 Spring Cloud Alibaba、Dubbo、MyBatis-Plus 等框架的使用",
		"熟悉 MySQL 海量数据存储及其性能优化，了解 MySQL 运行机制、存储引擎、索引原理、事务和锁以及集群架构设计，熟悉数据库中间件 ShardingSphere 的使用",
		"熟悉大型分布式架构设计，掌握分布式锁、分布式事务、分布式Session、分布式任务调度等常见分布式解决方案；熟悉微服务架构的设计，理解服务注册发现、配置中心、限流、熔断、降级、网关路由等机制",
		"熟悉高性能分布式缓存 (Redis)、分布式消息服务中间件 (RabbitMQ, RocketMQ, Kafka)、分布式搜索引擎 (Elasticsearch) 及海量日志分析平台（ELK）等架构的应用",
		"熟悉团队协作 (Git, Maven)、容器与代理 (Tomcat, Nginx)、JVM相关 (JMC, jstack, jmap, jstat, btrace, MAT)、Linux系统分析 (vmstat, iostat & iotop, ifstat & iftop, netstat, dstat, strace) 等常用工具集"
	],
	"edu_exp" :
	[
		{
			"form_date" : "U2FsdGVkX1+qMR0+DRJEm7n0PGgwlwg=",
			"to_date" : "U2FsdGVkX19fcEfBKT/Gf3XIa+UF59g=",
			"school" : "U2FsdGVkX1/AU+G7TIFmQ9LgkcK01zoSAELHE6g8laVnKA==",
			"major" : "U2FsdGVkX19u5JnEuvjPMUJkPCCunEHz4kz9Hv0hux213Oc5Cw==",
			"degree" : "U2FsdGVkX1+hbept1dxqb4sivoF61ha3IWj4e5ZG8ElToQ=="
		},
		{
			"form_date" : "U2FsdGVkX1+qMR0+DRJEm7n0PGgwlwg=",
			"to_date" : "U2FsdGVkX1/2J1wSSa5Zo5gwE2CexRA=",
			"school" : "U2FsdGVkX1/AU+G7TIFmQ9LgkcK01zoSAELHE6g8laVnKA==",
			"major" : "U2FsdGVkX1+RHCVibksJKaAoM/Cb/WB5nljmzBQ2RnZikc7o4w==",
			"degree" : "U2FsdGVkX19L8/R+a6W563tpYQwLwA1UXx6M94Ky4FZX7A=="
		}
	],
	"self_evaluation" : "对工作有较强的责任心，有很好的学习能力，善于解决复杂的业务逻辑问题"
};
