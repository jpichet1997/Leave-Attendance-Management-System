// --- 1. Language Config ---
let lang = localStorage.getItem('hr_lang') || 'th';
const dict = {
    'th': {
        'dash': 'หน้าหลัก', 'time': 'ลงเวลา & วันลา', 'slip': 'สลิปเงินเดือน', 'cal': 'ปฏิทินบริษัท', 'doc': 'เอกสารองค์กร', 'prof': 'โปรไฟล์ส่วนตัว',
        'admin_dash': 'สถิติภาพรวม', 'admin_appr': 'อนุมัติคำขอ', 'admin_dir': 'รายชื่อพนักงาน', 'admin_rep': 'รายงานวิเคราะห์', 'admin_set': 'ตั้งค่าระบบ',
        'it_dash': 'แผงควบคุมระบบ (IT)', 'it_users': 'จัดการผู้ใช้งาน', 'it_set': 'ตั้งค่าระบบเซิร์ฟเวอร์', 'it_log': 'ประวัติการใช้งานระบบ',
        'welcome': 'ยินดีต้อนรับกลับมา,', 'clock_title': 'ระบบลงเวลา', 'clock_btn_in': 'บันทึกเข้างาน', 'clock_btn_out': 'บันทึกออกงาน',
        'loc_office': '🏢 สำนักงานใหญ่', 'loc_wfh': '🏠 WFH', 'salary_title': 'เงินเดือนสุทธิ (เดือนนี้)',
        'show': 'แสดง', 'hide': 'ซ่อน', 'leave_bal': 'วันลาคงเหลือ', 'req_ot': 'ขอทำ OT', 'req_lv': 'ขอลางาน',
        'tab_log': 'ประวัติลงเวลา', 'tab_lv': 'ประวัติการลา', 'tab_ot': 'ประวัติ OT', 'no_data': 'ไม่พบข้อมูล', 
        'approve': 'อนุมัติ', 'reject': 'ปฏิเสธ', 'loading': 'กำลังดึงข้อมูล...',
        'slip_base': 'เงินเดือนพื้นฐาน', 'slip_ot': 'เงินค่าล่วงเวลา (OT)', 'slip_allow': 'เบี้ยขยัน/ค่าตำแหน่ง',
        'slip_total_earn': 'รวมรายได้', 'slip_sso': 'หัก ประกันสังคม', 'slip_tax': 'หัก ภาษี ณ ที่จ่าย (ประมาณ)',
        'slip_absent': 'หัก ขาด/ลา/สาย', 'slip_total_deduct': 'รวมรายการหัก', 'slip_net': 'เงินเดือนสุทธิ',
        'acc_locked': '⛔ บัญชีผู้ใช้ถูกระงับหรือหมดอายุ โปรดติดต่อ Admin',
        'btn_active': 'ใช้งานอยู่', 'btn_inactive': 'ถูกระงับ',
        'act_disable': 'ปิดใช้งาน', 'act_enable': 'เปิดใช้งาน'
    },
    'en': {
        'dash': 'Dashboard', 'time': 'Time & Leave', 'slip': 'E-Payslip', 'cal': 'Company Calendar', 'doc': 'Policies & Docs', 'prof': 'My Profile',
        'admin_dash': 'Overview', 'admin_appr': 'Approvals', 'admin_dir': 'Employee Directory', 'admin_rep': 'Analytics', 'admin_set': 'System Settings',
        'it_dash': 'IT Operations', 'it_users': 'Manage Users', 'it_set': 'System Config', 'it_log': 'Audit Logs',
        'welcome': 'Welcome back,', 'clock_title': 'Attendance System', 'clock_btn_in': 'Clock In', 'clock_btn_out': 'Clock Out',
        'loc_office': '🏢 Head Office', 'loc_wfh': '🏠 Remote WFH', 'salary_title': 'Net Salary (Current)',
        'show': 'Show', 'hide': 'Hide', 'leave_bal': 'Leave Balance', 'req_ot': 'Request OT', 'req_lv': 'Request Leave',
        'tab_log': 'Clock Logs', 'tab_lv': 'Leave History', 'tab_ot': 'OT History', 'no_data': 'No records found', 
        'approve': 'Approve', 'reject': 'Reject', 'loading': 'Fetching data...',
        'slip_base': 'Base Salary', 'slip_ot': 'OT Pay', 'slip_allow': 'Allowances',
        'slip_total_earn': 'Total Earnings', 'slip_sso': 'Deduct SSO', 'slip_tax': 'Deduct Tax (Est.)',
        'slip_absent': 'Deduct Absences', 'slip_total_deduct': 'Total Deductions', 'slip_net': 'Net Salary',
        'acc_locked': '⛔ Account suspended or expired. Please contact Admin.',
        'btn_active': 'Active', 'btn_inactive': 'Inactive',
        'act_disable': 'Disable', 'act_enable': 'Enable'
    }
};

const t = (key) => dict[lang][key] || key;

function toggleLanguage(event) { 
    if(event) event.preventDefault(); 
    lang = lang === 'th' ? 'en' : 'th'; 
    localStorage.setItem('hr_lang', lang); 
    applyLang(); 
    
    const authView = document.getElementById('auth-view');
    if (AppState && AppState.currentUser && authView.style.display === 'none') {
        App.boot();
    }
}

function applyLang() { 
    document.querySelectorAll('.th-en').forEach(el => el.innerText = el.getAttribute(`data-${lang}`)); 
    const btn = document.getElementById('top-lang-btn'); 
    if(btn) {
        btn.innerText = lang === 'th' ? 'EN' : 'TH'; 
        btn.onclick = (e) => toggleLanguage(e); 
    }
    const langBtns = document.querySelectorAll('.lang-switch');
    langBtns.forEach(btn => { btn.onclick = (e) => toggleLanguage(e); });
}

// --- 2. Database & State (Firebase Version) ---
const firebaseConfig = {
    apiKey: "AIzaSyAUHCBVj2_6grlBdexUmP1BjzflOCaHiMQ",
    authDomain: "hr-system-2026-7c138.firebaseapp.com",
    projectId: "hr-system-2026-7c138",
    storageBucket: "hr-system-2026-7c138.firebasestorage.app",
    messagingSenderId: "502248569009",
    appId: "1:502248569009:web:b56da4a67ea3290fdd0a90",
    measurementId: "G-SGL2CY68DY"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbRef = db.collection('hr_database').doc('main_state');

const defaultState = {
    users: [
        { username: 'admin', password: '123', name: 'Manager Admin', role: 'admin', dept: 'Management', isActive: true },
        { username: 'user', password: '123', name: 'พิเชษฐ์ แจ้งกระจ่าง', role: 'employee', dept: 'IT Operations', isActive: true },
        { username: 'it', password: '123', name: 'IT Admin', role: 'it', dept: 'System Support', isActive: true }
    ],
    currentUser: null, 
    dailyClock: {}, 
    leaveBalances: { 'user': { annual: 8.5, sick: 28 }, 'admin': { annual: 15, sick: 30 }, 'it': { annual: 15, sick: 30 } }, 
    requests: [], 
    timeLogs: [], 
    notifications: [], 
    auditLogs: [], // 🟢 เพิ่ม Array สำหรับเก็บประวัติการใช้งาน
    profiles: { 
        'admin': { email: 'admin@quantum.co.th', phone: '089-999-9999', startDate: '2020-01-01', avatar: '' },
        'user': { email: 'user@quantum.co.th', phone: '081-234-5678', startDate: '2024-01-15', avatar: '' },
        'it': { email: 'it@quantum.co.th', phone: '088-888-8888', startDate: '2022-05-10', avatar: '' }
    },
    settings: { companyName: 'Quantum Corp', leaveQuota: 10, broadcast: '', maintenance: false }
};

let AppState = defaultState;

const DB = {
    load: async () => {
        try {
            const doc = await dbRef.get();
            if (doc.exists) {
                AppState = doc.data();
                AppState.currentUser = null; 
                if(!AppState.profiles) { AppState.profiles = defaultState.profiles; }
                if(!AppState.auditLogs) AppState.auditLogs = []; // ป้องกันกรณีข้อมูลเก่าไม่มีฟิลด์นี้
                if (AppState.settings.broadcast === undefined) AppState.settings.broadcast = '';
                if (AppState.settings.maintenance === undefined) AppState.settings.maintenance = false;
            } else { 
                await dbRef.set(defaultState); 
                AppState = defaultState; 
            }
            return AppState;
        } catch (error) { console.error("Firebase Load Error:", error); return AppState; }
    },
    save: (state) => {
        const dataToSave = { ...state };
        delete dataToSave.currentUser;
        dbRef.set(dataToSave, { merge: true }).catch(err => console.error("Save Error:", err));
    }
};

let chartInst = null; 
let liveChartInst = null; // 🟢 ตัวแปรสำหรับกราฟหุ้น IT
let liveChartInterval = null; // 🟢 ตัวแปรสำหรับ Loop กราฟ
let isSalaryVisible = false; 
let calMonth = new Date().getMonth();
let calYear = new Date().getFullYear();

// --- 3. App Core Logic ---
const Notif = {
    push: (user, msg) => {
        AppState.notifications.unshift({ id: Date.now(), username: user, message: msg, isRead: false, time: new Date().toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}) });
        DB.save(AppState);
        if (AppState.currentUser && AppState.currentUser.username === user) { App.toast(msg); Notif.render(); }
    },
    render: () => {
        if(!AppState.currentUser) return;
        const notifs = AppState.notifications.filter(n => n.username === AppState.currentUser.username);
        const unread = notifs.filter(n => !n.isRead).length;
        const b = document.getElementById('notif-badge');
        if(b) { b.innerText = unread; b.style.display = unread > 0 ? 'block' : 'none'; }
        const list = document.getElementById('notif-list');
        if(list) list.innerHTML = notifs.slice(0, 5).map(n => `<div class="notif-item ${n.isRead?'':'unread'}" onclick="App.nav('time', this)"><div style="color:var(--primary); font-weight:500;">${n.message}</div><small style="color:var(--text-muted);">${n.time}</small></div>`).join('') || `<div class="empty-state">${t('no_data')}</div>`;
    },
    toggle: () => document.getElementById('notif-dropdown').classList.toggle('show'),
    read: (id) => { const n = AppState.notifications.find(x => x.id === id); if(n) { n.isRead = true; DB.save(AppState); Notif.render(); } }
};

const Auth = {
    toggle: (type) => {
        document.getElementById('form-login').style.display = type === 'login' ? 'block' : 'none';
        document.getElementById('form-register').style.display = type === 'register' ? 'block' : 'none';
    },
    register: () => {
        const name = document.getElementById('reg-name').value, user = document.getElementById('reg-user').value, pass = document.getElementById('reg-pass').value, role = document.getElementById('reg-role').value;
        if (AppState.users.find(u => u.username === user)) return App.toast('Username is taken', 'error');
        
        let defDept = 'General';
        if(role === 'admin') defDept = 'HR';
        if(role === 'it') defDept = 'IT Operations';

        AppState.users.push({ username: user, password: pass, name: name, role: role, dept: defDept, isActive: true });
        AppState.leaveBalances[user] = { annual: AppState.settings.leaveQuota, sick: 30 }; 
        AppState.profiles[user] = { email: user+'@quantum.co.th', phone: '-', startDate: new Date().toLocaleDateString('en-CA'), avatar: '' };
        
        App.addLog('Account Created', `สร้างบัญชีใหม่: ${user} (${role})`); // 🟢 บันทึก Log
        DB.save(AppState); App.toast('Account Created', 'success'); Auth.toggle('login'); 
    },
    login: () => {
        const u = document.getElementById('login-user').value, p = document.getElementById('login-pass').value;
        
        // 🟢 ตรวจสอบโหมดซ่อมบำรุง (Maintenance)
        if(AppState.settings.maintenance && u !== 'it') {
            if(typeof Swal !== 'undefined') {
                Swal.fire({ icon: 'warning', title: 'System Maintenance', text: 'ระบบกำลังอยู่ในช่วงปรับปรุงโดยฝ่าย IT กรุณาเข้าใช้งานภายหลัง' });
            } else { alert('System Maintenance Mode. Please try again later.'); }
            return;
        }

        const acc = AppState.users.find(x => x.username === u && x.password === p);
        if (acc) { 
            if (acc.isActive === false) { alert(t('acc_locked')); return; }
            AppState.currentUser = acc; 
            localStorage.setItem('hr_logged_user', JSON.stringify(acc)); 
            
            App.addLog('Login', `ผู้ใช้ ${u} เข้าสู่ระบบสำเร็จ`); // 🟢 บันทึก Log

            const isThai = lang === 'th';
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success', title: isThai ? 'เข้าสู่ระบบสำเร็จ!' : 'Login Successful!',
                    text: isThai ? 'กำลังพาท่านเข้าสู่ระบบ...' : 'Redirecting to your dashboard...',
                    showConfirmButton: false, timer: 1500
                }).then(() => { App.boot(); });
            } else { App.boot(); }
        } else alert('Invalid credentials');
    },
    logout: () => { 
        App.addLog('Logout', `ผู้ใช้ ${AppState.currentUser.username} ออกจากระบบ`);
        AppState.currentUser = null; localStorage.removeItem('hr_logged_user'); location.reload(); 
    }
};

const App = {
    // 🟢 ฟังก์ชันสำหรับบันทึกประวัติการใช้งาน (Audit Log)
    addLog: (action, detail) => {
        if (!AppState.auditLogs) AppState.auditLogs = [];
        AppState.auditLogs.unshift({
            id: Date.now(),
            user: AppState.currentUser ? AppState.currentUser.name : 'System',
            role: AppState.currentUser ? AppState.currentUser.role : '-',
            action: action,
            detail: detail,
            time: new Date().toLocaleString('th-TH')
        });
        DB.save(AppState);
    },

    boot: () => {
        document.getElementById('auth-view').style.display = 'none';
        document.getElementById('app-view').style.display = 'flex';
        
        const u = AppState.currentUser;
        document.getElementById('user-name').innerText = u.name;
        document.getElementById('user-dept').innerText = u.dept;
        App.updateAvatarImg();
        
        const menu = document.getElementById('nav-menu');
        
        if (u.role === 'admin') {
            menu.innerHTML = `
                <div class="nav-divider">HR DASHBOARD</div>
                <div class="nav-item active" onclick="App.nav('admin-dash', this)">📊 ${t('admin_dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-approve', this)">✅ ${t('admin_appr')} <span class="badge bg-danger" style="color:white; margin-left:auto;" id="badge-pending">0</span></div>
                <div class="nav-divider">ADMINISTRATION</div>
                <div class="nav-item" onclick="App.nav('admin-dir', this)">👥 ${t('admin_dir')}</div>
                <div class="nav-item" onclick="App.nav('admin-rep', this)">📈 ${t('admin_rep')}</div>
                <div class="nav-divider">PERSONAL</div>
                <div class="nav-item" onclick="App.nav('prof', this)">⚙️ ${t('prof')}</div>`;
            App.nav('admin-dash', menu.children[1]);
            
        } else if (u.role === 'it') {
            menu.innerHTML = `
                <div class="nav-divider">IT OPERATIONS</div>
                <div class="nav-item active" onclick="App.nav('it-dash', this)">💻 ${t('it_dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-dir', this)">👥 ${t('it_users')}</div>
                <div class="nav-item" onclick="App.nav('it-logs', this)">📜 ${t('it_log')}</div>
                <div class="nav-item" onclick="App.nav('admin-set', this)">⚙️ ${t('it_set')}</div>
                <div class="nav-divider">PERSONAL</div>
                <div class="nav-item" onclick="App.nav('prof', this)">⚙️ ${t('prof')}</div>`;
            App.nav('it-dash', menu.children[1]);

        } else {
            menu.innerHTML = `
                <div class="nav-divider">MY WORKSPACE</div>
                <div class="nav-item active" onclick="App.nav('home', this)">🏠 ${t('dash')}</div>
                <div class="nav-item" onclick="App.nav('time', this)">⏱️ ${t('time')}</div>
                <div class="nav-item" onclick="App.nav('payslip', this)">📄 ${t('slip')}</div>
                <div class="nav-divider">COMPANY</div>
                <div class="nav-item" onclick="App.nav('cal', this)">📅 ${t('cal')}</div>
                <div class="nav-item" onclick="App.nav('doc', this)">📚 ${t('doc')}</div>
                <div class="nav-item" onclick="App.nav('prof', this)">⚙️ ${t('prof')}</div>`;
            App.nav('home', menu.children[1]);
        }
        Notif.render(); App.updateBadge();
    },
    
    nav: (page, el) => {
        // 🟢 ล้าง Loop กราฟวิ่งทุกครั้งที่เปลี่ยนหน้า เพื่อไม่ให้หน่วงเครื่อง
        if(liveChartInterval) clearInterval(liveChartInterval);

        if(el) { document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active')); el.classList.add('active'); }
        
        // 🟢 2. Loading State (Skeleton Loading)
        document.getElementById('page-content').innerHTML = `
            <div class="skeleton-loader">
                <div class="skeleton-line" style="width: 40%; height: 35px; margin-bottom: 30px;"></div>
                <div class="grid-3" style="margin-bottom: 30px;">
                    <div class="skeleton-card" style="height: 120px;"></div>
                    <div class="skeleton-card" style="height: 120px;"></div>
                    <div class="skeleton-card" style="height: 120px;"></div>
                </div>
                <div class="skeleton-card" style="height: 300px;"></div>
            </div>
        `;

        setTimeout(() => {
            document.getElementById('page-content').innerHTML = Views[page]();
            if(page === 'home') { isSalaryVisible = false; App.updateClock(); App.renderChart(); }
            if(page === 'payslip') App.genSlip();
            if(page === 'cal') App.renderCalendarGrid();
            if(page === 'admin-rep') App.renderAdminCharts();
            if(page === 'admin-dash') App.renderAdminDashChart();
            if(page === 'it-dash') App.renderITLiveChart(); // 🟢 เรียกใช้งานกราฟวิ่ง
        }, 400); // แสดงโครง Skeleton 0.4 วินาทีเพื่อความสวยงาม
    },

    getSalary: () => {
        const u = AppState.currentUser;
        if(u.role === 'admin' || u.role === 'it') { return { base: 85000, ot: 0, allow: 5000, sso: 750, tax: 6500, absent: 0, earn: 90000, deduct: 7250, net: 82750 }; } 
        else { return { base: 35000, ot: 4250, allow: 1500, sso: 750, tax: 1250, absent: 0, earn: 40750, deduct: 2000, net: 38750 }; }
    },

    updateAvatarImg: () => {
        const u = AppState.currentUser.username;
        if(!AppState.profiles[u]) AppState.profiles[u] = { email: '', phone: '', startDate: '', avatar: '' }; 
        const src = AppState.profiles[u].avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=eff6ff&color=2563eb&bold=true`;
        const img = document.getElementById('avatar-img'); if(img) img.src = src;
        const profImg = document.getElementById('prof-avatar-img'); if(profImg) profImg.src = src;
    },

    handleAvatarUpload: (e) => {
        const file = e.target.files[0]; const u = AppState.currentUser.username;
        if(file) { const reader = new FileReader(); reader.onload = (e) => { AppState.profiles[u].avatar = e.target.result; DB.save(AppState); App.updateAvatarImg(); App.toast('Profile photo updated', 'success'); }; reader.readAsDataURL(file); }
    },

    saveProfile: () => {
        const u = AppState.currentUser.username;
        AppState.profiles[u].email = document.getElementById('prof-email').value;
        AppState.profiles[u].phone = document.getElementById('prof-phone').value;
        DB.save(AppState); App.toast('Profile saved securely', 'success');
    },

    downloadFile: (filename) => {
        App.toast(`Downloading ${filename}...`);
        const blob = new Blob(["Simulated Document Content for: " + filename], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = filename + ".txt"; a.click();
        window.URL.revokeObjectURL(url);
    },

    getMonthOptions: () => {
        let options = '';
        const today = new Date();
        for(let i=0; i<12; i++) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const val = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}`;
            const label = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            options += `<option value="${val}">${label}</option>`;
        }
        return options;
    },

    exportToCSV: () => {
        App.toast('Exporting Database...');
        let csv = "\uFEFFID,Name,Department,Role,Status,Annual Leave,Sick Leave\n";
        AppState.users.forEach(u => {
            const bal = AppState.leaveBalances[u.username] || { annual: 0, sick: 0 };
            const status = u.isActive !== false ? 'Active' : 'Inactive';
            csv += `EMP-${u.username.toUpperCase()},${u.name},${u.dept},${u.role},${status},${bal.annual},${bal.sick}\n`;
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; 
        a.download = `Employee_Database_${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
    },

    // 🟢 1. Reset Password Function (สำหรับ IT/Admin)
    resetPass: (username) => {
        if(typeof Swal !== 'undefined') {
            Swal.fire({
                title: `Reset Password: ${username}`,
                input: 'text',
                inputLabel: 'ตั้งรหัสผ่านใหม่สำหรับพนักงานคนนี้',
                inputValue: '123456',
                showCancelButton: true,
                confirmButtonText: 'บันทึกรหัสใหม่',
                confirmButtonColor: '#2563eb'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const u = AppState.users.find(x => x.username === username);
                    if(u) {
                        u.password = result.value;
                        App.addLog('Password Reset', `เปลี่ยนรหัสผ่านของพนักงาน: ${username}`); // 🟢 บันทึก Log
                        DB.save(AppState);
                        App.toast('Reset Password Successfully', 'success');
                    }
                }
            });
        } else {
            const newPass = prompt(`ตั้งรหัสผ่านใหม่สำหรับ ${username}:`, "123456");
            if (newPass) {
                const u = AppState.users.find(x => x.username === username);
                if(u) {
                    u.password = newPass;
                    App.addLog('Password Reset', `เปลี่ยนรหัสผ่านของพนักงาน: ${username}`);
                    DB.save(AppState);
                    App.toast(`เปลี่ยนรหัสผ่านของ ${username} เรียบร้อยแล้ว`, 'success');
                }
            }
        }
    },

    openEditUser: (username) => {
        const u = AppState.users.find(x => x.username === username);
        const bal = AppState.leaveBalances[username] || { annual: 0, sick: 0 };
        
        let m = document.getElementById('modal-edit-user');
        if(!m) {
            m = document.createElement('div');
            m.className = 'modal';
            m.id = 'modal-edit-user';
            document.body.appendChild(m);
        }
        
        m.innerHTML = `
            <div class="modal-content">
                <div class="flex-between" style="margin-bottom:24px;">
                    <h1 style="margin:0; font-size:20px;">แก้ไขพนักงาน</h1>
                    <button class="btn-text" style="font-size:20px; color:var(--text-muted);" onclick="App.closeModal('modal-edit-user')">✕</button>
                </div>
                <form onsubmit="event.preventDefault(); App.saveEditUser('${username}');">
                    <label>ชื่อ-นามสกุล</label><input type="text" id="edit-u-name" value="${u.name}" required>
                    <label>แผนก (Department)</label><input type="text" id="edit-u-dept" value="${u.dept}" required>
                    <div class="grid-2">
                        <div>
                            <label>ระดับสิทธิ์ (Role)</label>
                            <select id="edit-u-role">
                                <option value="employee" ${u.role==='employee'?'selected':''}>Employee</option>
                                <option value="admin" ${u.role==='admin'?'selected':''}>Admin (HR)</option>
                                <option value="it" ${u.role==='it'?'selected':''}>IT Support</option>
                            </select>
                        </div>
                        <div><label>Username (ID)</label><input type="text" value="${u.username}" disabled style="background:#f1f5f9;"></div>
                    </div>
                    <div class="grid-2">
                        <div><label>วันพักร้อนคงเหลือ (วัน)</label><input type="number" step="0.5" id="edit-u-annual" value="${bal.annual}" required></div>
                        <div><label>วันลาป่วยคงเหลือ (วัน)</label><input type="number" step="0.5" id="edit-u-sick" value="${bal.sick}" required></div>
                    </div>
                    <div style="display:flex; gap:12px; margin-top:16px;">
                        <button type="button" class="btn-outline" style="flex:1;" onclick="App.closeModal('modal-edit-user')">ยกเลิก</button>
                        <button type="submit" class="btn-primary" style="flex:2;">บันทึกข้อมูล</button>
                    </div>
                </form>
            </div>
        `;
        App.openModal('modal-edit-user');
    },

    saveEditUser: (username) => {
        const u = AppState.users.find(x => x.username === username);
        if(u) {
            u.name = document.getElementById('edit-u-name').value;
            u.dept = document.getElementById('edit-u-dept').value;
            u.role = document.getElementById('edit-u-role').value;
        }
        
        if(!AppState.leaveBalances[username]) AppState.leaveBalances[username] = {};
        AppState.leaveBalances[username].annual = parseFloat(document.getElementById('edit-u-annual').value);
        AppState.leaveBalances[username].sick = parseFloat(document.getElementById('edit-u-sick').value);
        
        App.addLog('User Edited', `แก้ไขข้อมูลพนักงาน: ${username}`); // 🟢 บันทึก Log
        DB.save(AppState);
        App.closeModal('modal-edit-user');
        App.toast('อัปเดตข้อมูลพนักงานสำเร็จ!', 'success');
        
        const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Employee') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage Users'));
        if(navEl) App.nav('admin-dir', navEl);
    },

    toggleUserStatus: (username) => {
        if (username === AppState.currentUser.username) { return App.toast('คุณไม่สามารถระงับบัญชีของตัวเองได้!', 'error'); }
        const u = AppState.users.find(x => x.username === username);
        if(u) {
            u.isActive = u.isActive === false ? true : false;
            
            App.addLog('Status Changed', `เปลี่ยนสถานะบัญชี ${username} เป็น ${u.isActive ? 'Active' : 'Inactive'}`); // 🟢 บันทึก Log
            DB.save(AppState);
            App.toast(`อัปเดตสถานะบัญชี ${username} เรียบร้อย`, 'success');
            
            const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Employee') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage Users'));
            if(navEl) App.nav('admin-dir', navEl);
        }
    },

    changeCalMonth: (dir) => { calMonth += dir; if(calMonth < 0) { calMonth = 11; calYear--; } else if(calMonth > 11) { calMonth = 0; calYear++; } App.renderCalendarGrid(); },
    renderCalendarGrid: () => {
        const wrapper = document.getElementById('cal-wrapper'); if(!wrapper) return;
        const d = new Date(calYear, calMonth, 1);
        document.getElementById('cal-title').innerText = `${d.toLocaleString('en-US', { month: 'long' })} ${calYear}`;
        const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
        const firstDayIndex = d.getDay();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === calMonth && today.getFullYear() === calYear;
        let html = '';
        for(let i=0; i<firstDayIndex; i++) html += `<div class="cal-day empty"></div>`;
        for(let i=1; i<=daysInMonth; i++) {
            let classes = "cal-day"; if(isCurrentMonth && i === today.getDate()) classes += " today";
            let eventHTML = "";
            if(i === 10) eventHTML = `<span class="event-badge" style="background:#fee2e2; color:#b91c1c;">Public Holiday</span>`;
            if(i === 25) eventHTML = `<span class="event-badge">Payroll Cut-off</span>`;
            html += `<div class="${classes}"><div style="font-weight:bold;">${i}</div>${eventHTML}</div>`;
        }
        wrapper.innerHTML = html;
    },
    saveSettings: () => {
        AppState.settings.companyName = document.getElementById('set-company').value;
        AppState.settings.leaveQuota = parseInt(document.getElementById('set-quota').value);
        AppState.settings.broadcast = document.getElementById('set-broadcast').value; 
        
        // บันทึกสถานะ Maintenance ถ้ามีให้ดึง
        const maintEl = document.getElementById('set-maintenance');
        if(maintEl) {
            const isMaint = maintEl.value === 'on';
            if (AppState.settings.maintenance !== isMaint) {
                App.addLog('System', `เปิด/ปิดโหมด Maintenance: ${isMaint ? 'ON' : 'OFF'}`);
            }
            AppState.settings.maintenance = isMaint;
        }

        DB.save(AppState); 
        App.toast('System settings updated securely', 'success');
    },
    
    // 🟢 ฟังก์ชันสำหรับ IT: Backup Database
    backupDB: () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = "HR_Database_Backup_" + new Date().toISOString().slice(0,10) + ".json";
        a.click();
        App.addLog('System', 'ดาวน์โหลด Backup Database'); // 🟢 บันทึก Log
        App.toast('Database Backup Downloaded', 'success');
    },

    // 🟢 ฟังก์ชันสำหรับ IT: Clear Cache
    clearCache: () => {
        if(typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Clear System Cache?',
                text: "การล้างแคชอาจทำให้ระบบโหลดช้าลงในการเข้าใช้งานครั้งถัดไป คุณต้องการทำต่อหรือไม่?",
                icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6', confirmButtonText: 'Yes, clear cache!'
            }).then((result) => {
                if (result.isConfirmed) {
                    App.addLog('System', 'ล้างแคชระบบ (Clear Cache)'); // 🟢 บันทึก Log
                    App.toast('System Cache Cleared Successfully!', 'success');
                }
            });
        } else { App.toast('Cache Cleared'); }
    },

    clock: () => {
        const u = AppState.currentUser.username, d = new Date().toLocaleDateString('en-CA'), loc = document.getElementById('work-location').value;
        if (!AppState.dailyClock[u] || AppState.dailyClock[u].date !== d) AppState.dailyClock[u] = { date: d, status: 'out', in: null };
        let c = AppState.dailyClock[u];
        if (c.status === 'out') { c.status = 'in'; c.in = Date.now(); c.loc = loc; App.toast('Clocked in successfully'); } 
        else {
            const hrs = ((Date.now() - c.in) / 3600000).toFixed(2);
            AppState.timeLogs.unshift({ u: u, d: d, in: new Date(c.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}), out: new Date().toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}), hrs, loc: c.loc });
            c.status = 'out'; c.in = null; App.toast(`Clocked out. Total: ${hrs} hrs`);
        }
        DB.save(AppState); App.updateClock();
    },
    updateClock: () => {
        const btn = document.getElementById('btn-clock'), st = document.getElementById('status-clock'), sel = document.getElementById('work-location');
        if(!btn) return; let c = AppState.dailyClock[AppState.currentUser.username];
        if (c && c.status === 'in' && c.date === new Date().toLocaleDateString('en-CA')) {
            sel.disabled = true; btn.innerText = `⏹️ ${t('clock_btn_out')}`; btn.classList.replace('btn-primary', 'btn-danger');
            st.innerHTML = `<span style="color:var(--success); font-weight:600;">🟢 Active (${c.loc})</span><br><span class="text-muted">Since ${new Date(c.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</span>`;
        } else { sel.disabled = false; btn.innerText = `⏳ ${t('clock_btn_in')}`; btn.classList.replace('btn-danger', 'btn-primary'); st.innerHTML = `<span class="text-muted">Not clocked in</span>`; }
    },
    submitLeave: () => {
        const u = AppState.currentUser.username, k = document.getElementById('lv-type').value.includes('Annual') ? 'annual' : 'sick';
        let days = document.getElementById('lv-format').value === 'hourly' ? 0.125 : 1; 
        if(!AppState.leaveBalances[u]) AppState.leaveBalances[u] = { annual: AppState.settings.leaveQuota, sick: 30 };
        if(AppState.leaveBalances[u][k] < days) return App.toast('Insufficient balance', 'error');
        AppState.leaveBalances[u][k] -= days;
        AppState.requests.unshift({ id: Date.now(), type: 'Leave', u: u, name: AppState.currentUser.name, detail: document.getElementById('lv-type').value, reason: document.getElementById('lv-reason').value, status: 'Pending' });
        DB.save(AppState); App.closeModal('modal-leave'); App.toast('Request Submitted'); App.nav('time', document.querySelectorAll('.nav-item')[1]); 
    },
    submitOT: () => {
        AppState.requests.unshift({ id: Date.now(), type: 'OT', u: AppState.currentUser.username, name: AppState.currentUser.name, detail: document.getElementById('ot-hours').value + ' Hrs', reason: document.getElementById('ot-reason').value, status: 'Pending' });
        DB.save(AppState); App.closeModal('modal-ot'); App.toast('OT Requested'); App.nav('time', document.querySelectorAll('.nav-item')[1]);
    },

    sendLineAlert: (employee, type, status) => {
        const webhookUrl = "https://hook.eu1.make.com/63miskvj947chdguwvz553l12ikk9qqb"; 
        
        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                employeeName: employee,
                requestType: type,
                result: status,
                time: new Date().toLocaleString('th-TH')
            })
        })
        .then(() => console.log("Webhook data sent successfully!"))
        .catch(err => console.error("Webhook Error:", err));
    },

    actionReq: (id, stat) => {
        const r = AppState.requests.find(x => x.id === id);
        if(r) { 
            r.status = stat; 
            App.addLog('Approval', `แอดมิน ${stat} คำขอ ${r.type} ของพนักงาน: ${r.name}`); // 🟢 บันทึก Log
            DB.save(AppState); 
            App.toast(`Marked as ${stat}`); 
            App.sendLineAlert(r.name, r.type, stat);
            App.nav('admin-approve'); 
            App.updateBadge(); 
            Notif.push(r.u, `Manager ${stat} your ${r.type} request.`); 
        }
    },

    renderChart: () => {
        if(chartInst) chartInst.destroy();
        const u = AppState.currentUser.username;
        const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0;
        const ctx = document.getElementById('userChart');
        if(!ctx) return;
        chartInst = new Chart(ctx, { type: 'doughnut', data: { labels: ['Used', 'Remaining'], datasets: [{ data: [AppState.settings.leaveQuota-bal, bal], backgroundColor: ['#e2e8f0', '#2563eb'], borderWidth: 0 }] }, options: { cutout: '80%', plugins: { legend: { display: false } } } });
    },
    
    renderAdminDashChart: () => {
        if(chartInst) chartInst.destroy();
        const ctx = document.getElementById('adminDashChart');
        if (!ctx) return; 

        chartInst = new Chart(ctx, { 
            type: 'bar', 
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], 
                datasets: [
                    { label: 'Present', data: [12, 15, 14, 13, 10], backgroundColor: '#059669' },
                    { label: 'Leave', data: [2, 0, 1, 1, 4], backgroundColor: '#d97706' },
                    { label: 'WFH', data: [1, 0, 0, 1, 1], backgroundColor: '#2563eb' }
                ]
            }, 
            options: { 
                maintainAspectRatio: false, 
                scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
                plugins: { legend: { position: 'top' } }
            } 
        });
    },

    // 🟢 ปรับฟังก์ชันกราฟวิ่งให้สมูทและเนียนขึ้น
    renderITLiveChart: () => {
        if(liveChartInst) liveChartInst.destroy();
        const ctx = document.getElementById('itLiveChart');
        if (!ctx) return;

        // จำลองข้อมูล CPU โดยเริ่มที่ประมาณ 15-25%
        let currentCpu = 20; 
        const initialData = Array.from({length: 40}, () => {
            currentCpu += (Math.random() * 4) - 2; // ขยับทีละน้อยๆ (เนียนขึ้น)
            if(currentCpu < 5) currentCpu = 5;
            if(currentCpu > 90) currentCpu = 90;
            return currentCpu;
        });

        liveChartInst = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(40).fill(''), 
                datasets: [{
                    label: 'CPU Usage (%)',
                    data: initialData,
                    borderColor: '#10b981', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4, 
                    pointRadius: 0 
                }]
            },
            options: {
                maintainAspectRatio: false,
                animation: { duration: 0 }, // ปิด animation ของ chart.js เพื่อไม่ให้กระตุกเวลา shift array
                scales: {
                    y: { min: 0, max: 100, ticks: { stepSize: 20 } },
                    x: { display: false } 
                },
                plugins: { legend: { display: false } }
            }
        });

        // อัปเดตข้อมูลทุกๆ 1 วินาทีแบบเนียนๆ
        liveChartInterval = setInterval(() => {
            const data = liveChartInst.data.datasets[0].data;
            let lastVal = data[data.length - 1];
            
            // ขยับค่าให้สมจริง (ไม่กระโดดแรงเกินไป)
            let change = (Math.random() * 6) - 3; 
            
            // สุ่มให้บางครั้งมีการ Spike (พุ่งขึ้น) เหมือนเซิร์ฟเวอร์โหลดหนัก
            if(Math.random() > 0.95) change += 20; 

            let newVal = lastVal + change;
            if(newVal > 98) newVal = 98; 
            if(newVal < 2) newVal = 2;

            data.push(newVal); 
            data.shift(); 
            liveChartInst.update();
        }, 1000);
    },

    genSlip: () => {
        const wrapper = document.getElementById('printable-area'); if(!wrapper) return;
        const slip = App.getSalary();
        wrapper.innerHTML = `<div style="background:white; padding:40px; border:1px solid var(--border); border-radius:var(--radius); font-family:'Kanit',monospace; max-width:800px; margin:0 auto; box-shadow:var(--shadow);">
            <div style="text-align:center; margin-bottom:30px;"><h2 style="font-size:24px; color:var(--primary); margin:0;">${AppState.settings.companyName}</h2><p style="color:var(--text-muted); margin:5px 0 0 0;"> Secure E-Payslip - ${document.getElementById('slip-month').value}</p></div>
            <div style="background:var(--bg-main); padding:15px; border-radius:var(--radius-sm); margin-bottom:25px; display:flex; justify-content:space-between; font-size:14px;"><div>${t('prof')}: <b>${AppState.currentUser.name}</b> (EMP-${AppState.currentUser.username.toUpperCase()})</div><div style="text-align:right">DEPT: <b>${AppState.currentUser.dept}</b></div></div>
            <div class="grid-2" style="gap:30px;">
                <div><h3 style="font-size:16px; color:var(--success); border-bottom:2px solid var(--success); padding-bottom:5px; margin-bottom:15px;">รายรับ (Earnings)</h3><div class="flex-between" style="padding:8px 0;"><span>${t('slip_base')}</span><b>${slip.base.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0;"><span>${t('slip_ot')}</span><b>${slip.ot.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0; border-bottom:1px solid var(--border);"><span>${t('slip_allow')}</span><b>${slip.allow.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:12px 0; font-weight:700; color:var(--primary);"><span>${t('slip_total_earn')}</span><b style="font-size:16px;">฿ ${slip.earn.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div></div>
                <div><h3 style="font-size:16px; color:var(--danger); border-bottom:2px solid var(--danger); padding-bottom:5px; margin-bottom:15px;">รายจ่าย (Deductions)</h3><div class="flex-between" style="padding:8px 0;"><span>${t('slip_sso')}</span><b>${slip.sso.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0;"><span>${t('slip_tax')}</span><b>${slip.tax.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0; border-bottom:1px solid var(--border); color:var(--danger);"><span>${t('slip_absent')}</span><b>${slip.absent.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:12px 0; font-weight:700; color:var(--primary);"><span>${t('slip_total_deduct')}</span><b style="font-size:16px;">฿ ${slip.deduct.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div></div>
            </div>
            <div style="margin-top:40px; padding:20px; background:linear-gradient(135deg, var(--primary), #1e3a8a); color:white; border-radius:var(--radius-sm); text-align:right;"><div style="font-size:14px; opacity:0.8;">${t('slip_net')} (Net Pay)</div><div style="font-size:36px; font-weight:700; letter-spacing:-1px;">฿ ${slip.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</div></div>
            <div style="text-align:center; margin-top:30px; font-size:12px; color:var(--text-muted); border-top:1px dashed var(--border); padding-top:15px;">This is a computer-generated document. No signature required.</div>
        </div>`;
    },
    toggleSal: () => { isSalaryVisible = !isSalaryVisible; document.getElementById('salary-val').classList.toggle('masked'); document.getElementById('salary-btn').innerHTML = isSalaryVisible ? `🔒 ${t('hide')}` : `👁️ ${t('show')}`; },
    switchTab: (id, btn) => { document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active')); document.getElementById(id).classList.add('active'); },
    openModal: (id) => document.getElementById(id).classList.add('show'),
    closeModal: (id) => document.getElementById(id).classList.remove('show'),
    updateBadge: () => { const b = document.getElementById('badge-pending'), c = AppState.requests.filter(r=>r.status==='Pending').length; if(b){b.innerText=c; b.style.display=c>0?'inline-block':'none';} },
    toast: (msg, type='primary') => { const box = document.getElementById('toast-container'), t = document.createElement('div'); t.className = 'toast'; t.innerText = msg; if(type==='error') t.style.borderLeftColor='var(--danger)'; box.appendChild(t); setTimeout(()=>t.remove(), 3500); }
};

// --- 5. VIEWS ---
const Views = {
    // 🟢 หน้า Dashboard พิเศษสำหรับ IT (กราฟวิ่งใหม่ที่สมูทขึ้น)
    'it-dash': () => {
        const activeUsers = AppState.users.filter(u => u.isActive !== false).length;
        const suspendedUsers = AppState.users.length - activeUsers;
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">💻 ${t('it_dash')}</h1>
            
            <div class="grid-3" style="margin-bottom: 24px;">
                <div class="card" style="border-top: 4px solid var(--primary);">
                    <h2 style="font-size:13px; color:var(--text-muted); text-transform:uppercase;">Total Accounts</h2>
                    <div class="stat-value" style="font-size:36px; margin-top:8px;">${AppState.users.length}</div>
                </div>
                <div class="card" style="border-top: 4px solid var(--success);">
                    <h2 style="font-size:13px; color:var(--text-muted); text-transform:uppercase;">Active Users</h2>
                    <div class="stat-value" style="color:var(--success); font-size:36px; margin-top:8px;">${activeUsers}</div>
                </div>
                <div class="card" style="border-top: 4px solid var(--danger);">
                    <h2 style="font-size:13px; color:var(--text-muted); text-transform:uppercase;">Suspended</h2>
                    <div class="stat-value" style="color:var(--danger); font-size:36px; margin-top:8px;">${suspendedUsers}</div>
                </div>
            </div>

            <div class="card" style="margin-bottom: 24px;">
                <h2 style="margin-bottom:16px; display:flex; align-items:center; gap:8px;">
                    <span style="display:inline-block; width:10px; height:10px; background:var(--success); border-radius:50%; box-shadow: 0 0 8px var(--success);"></span> 
                    Live Server Load (CPU Usage)
                </h2>
                <div style="height: 250px; width: 100%; position: relative;">
                    <canvas id="itLiveChart"></canvas>
                </div>
            </div>

            <div class="card">
                <h2 style="margin-bottom:16px;">System Health Check</h2>
                <div style="padding:20px; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:var(--radius-sm); color:#047857; display:flex; align-items:center; gap:16px; box-shadow:var(--shadow-sm);">
                    <div style="font-size:32px; background:white; width:60px; height:60px; display:flex; align-items:center; justify-content:center; border-radius:50%; box-shadow:var(--shadow-sm);">✅</div> 
                    <div>
                        <strong style="font-size:18px;">All Systems Operational</strong><br>
                        <span style="font-size:13px; opacity:0.8;">Firebase Database connected. Make.com Webhooks active.</span>
                    </div>
                </div>
            </div>
        </div>`;
    },

    // 🟢 หน้า Audit Logs สำหรับ IT
    'it-logs': () => {
        const logs = AppState.auditLogs || [];
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="flex-between" style="margin-bottom:24px;">
                <h1 style="margin:0;">📜 ${t('it_log')}</h1>
                <button class="btn-outline" onclick="App.toast('Logs exported', 'success')">📥 Export Logs</button>
            </div>
            <div class="card table-wrapper" style="padding:0;">
                <table style="margin:0;">
                    <thead><tr><th>Time</th><th>User</th><th>Role</th><th>Action</th><th>Details</th></tr></thead>
                    <tbody>${logs.slice(0, 50).map(l => `
                        <tr>
                            <td style="color:var(--text-muted); font-size:12px;">${l.time}</td>
                            <td><b style="color:var(--primary);">${l.user}</b></td>
                            <td><span class="badge" style="background:#f1f5f9;">${l.role.toUpperCase()}</span></td>
                            <td><span class="badge" style="background:#e0e7ff; color:#1d4ed8;">${l.action}</span></td>
                            <td style="font-size:13px;">${l.detail}</td>
                        </tr>
                    `).join('') || `<tr><td colspan="5" class="empty-state">No audit logs found.</td></tr>`}</tbody>
                </table>
            </div>
        </div>`;
    },

    'home': () => {
        const u = AppState.currentUser.username;
        const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0;
        const sal = App.getSalary(); 
        const broadcastMsg = AppState.settings.broadcast ? 
            `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 24px; border-radius: var(--radius-sm); color: #b45309; display: flex; gap: 12px; align-items: flex-start; box-shadow: var(--shadow-sm);"><div style="font-size: 20px;">📢</div><div><strong style="display:block; margin-bottom:4px;">ประกาศจากบริษัท (Announcement)</strong>${AppState.settings.broadcast}</div></div>` : '';

        return `
        <div style="margin-bottom: 32px; animation: fadeUp 0.4s ease-out;"><div style="color:var(--accent); font-size:13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${t('welcome')}</div><h1 style="margin:0; font-size:28px;">${AppState.currentUser.name}</h1></div>
        ${broadcastMsg} 
        <div class="grid-dash">
            <div><div class="card" style="background: linear-gradient(135deg, var(--primary), #1e3a8a); color: white; margin-bottom: 24px; border:none; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.4);"><div class="flex-between"><h2 style="color: #93c5fd; margin:0; font-weight: 500;">${t('salary_title')}</h2><button id="salary-btn" class="btn-toggle-view" onclick="App.toggleSal()">👁️ ${t('show')}</button></div><div class="salary-container"><span id="salary-val" class="salary-value masked">฿ ${sal.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div></div>
            <div class="card" style="margin-bottom: 24px;"><h2 style="color: var(--accent); display:flex; align-items:center; gap:8px;">${t('clock_title')}</h2><select id="work-location" style="margin-bottom: 16px;"><option value="Office">${t('loc_office')}</option><option value="WFH">${t('loc_wfh')}</option></select><div id="status-clock" style="margin-bottom: 20px; font-size: 14px; padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm); border: 1px dashed var(--border);">-</div><button id="btn-clock" class="btn-primary" onclick="App.clock()" style="padding: 14px; width:100%; font-size: 14px;">${t('clock_btn_in')}</button></div></div>
            <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content: center;"><h2 style="margin-bottom: 24px;">${t('leave_bal')}</h2><div style="position:relative; width:160px; height:160px; margin-bottom: 24px;"><canvas id="userChart"></canvas><div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;"><div style="font-size:32px; font-weight:700; color:var(--primary); line-height:1;">${bal}</div><div style="font-size:11px; color:var(--text-muted); font-weight: 600; margin-top: 4px;">DAYS</div></div></div><button class="btn-outline" style="width: 100%; color: var(--accent); border-color: var(--accent);" onclick="App.openModal('modal-leave')">${t('req_lv')}</button></div>
        </div>`;
    },
    'time': () => {
        const u = AppState.currentUser.username, logs = AppState.timeLogs.filter(x=>x.u===u), reqs = AppState.requests.filter(x=>x.u===u);
        return `<div class="flex-between" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;"><h1 style="margin:0;">${t('time')}</h1><div style="display:flex; gap:12px;"><button class="btn-outline" onclick="App.openModal('modal-ot')">${t('req_ot')}</button><button class="btn-primary" onclick="App.openModal('modal-leave')">${t('req_lv')}</button></div></div>
        <div class="card" style="padding-top:16px;"><div class="ui-tabs"><button class="tab-btn active" onclick="App.switchTab('t1', this)">${t('tab_log')}</button><button class="tab-btn" onclick="App.switchTab('t2', this)">${t('tab_lv')} / OT</button></div>
            <div id="t1" class="tab-content active table-wrapper"><table><thead><tr><th>Date</th><th>Location</th><th>In</th><th>Out</th><th>Hours</th></tr></thead><tbody>${logs.map(l=>`<tr><td><b style="color:var(--primary);">${l.d}</b></td><td><span class="badge" style="background:white; border: 1px solid var(--border); color:var(--text-muted);">${l.loc}</span></td><td>${l.in}</td><td>${l.out}</td><td><b style="color:var(--accent);">${l.hrs}</b></td></tr>`).join('') || `<tr><td colspan="5" class="empty-state">${t('no_data')}</td></tr>`}</tbody></table></div>
            <div id="t2" class="tab-content table-wrapper"><table><thead><tr><th>Type</th><th>Details</th><th>Status</th></tr></thead><tbody>${reqs.map(r=>`<tr><td><span class="badge" style="background:#f1f5f9; border:1px solid var(--border); color:var(--primary);">${r.type}</span></td><td><b>${r.detail}</b><br><span class="my-tooltip" style="font-size:12px;">${r.reason}<span class="tooltip-box">รายละเอียด:<br>${r.reason}</span></span></td><td><span class="badge bg-${r.status.toLowerCase()}">${r.status}</span></td></tr>`).join('') || `<tr><td colspan="3" class="empty-state">${t('no_data')}</td></tr>`}</tbody></table></div>
        </div>`;
    },
    'payslip': () => `
        <div class="flex-between no-print" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;">${t('slip')}</h1>
            <div style="display:flex; gap:12px;">
                <select id="slip-month" onchange="App.genSlip()" style="margin:0; width:auto; font-weight:500;">
                    ${App.getMonthOptions()}
                </select>
                <button class="btn-primary" onclick="window.print()">Print PDF</button>
            </div>
        </div>
        <div id="printable-area"></div>
    `,
    'cal': () => `<div style="animation: fadeUp 0.4s ease-out;"><div class="calendar-nav"><h1 style="margin:0;">${t('cal')} <span id="cal-title" style="color:var(--accent); font-weight:600; font-size:18px; margin-left:10px;"></span></h1><div style="display:flex; gap:8px;"><button class="cal-btn" onclick="App.changeCalMonth(-1)">⬅</button><button class="cal-btn" onclick="App.changeCalMonth(1)">➡</button></div></div><div class="card"><div class="calendar-grid"><div class="cal-header">SUN</div><div class="cal-header">MON</div><div class="cal-header">TUE</div><div class="cal-header">WED</div><div class="cal-header">THU</div><div class="cal-header">FRI</div><div class="cal-header">SAT</div></div><div class="calendar-grid" id="cal-wrapper"></div></div></div>`,
    'doc': () => {
        const docs = [{ name: 'Employee_Handbook_2026', title: 'Employee Handbook (คู่มือพนักงาน)', size: '2.4 MB', date: 'Jan 10, 2026' },{ name: 'WFH_Policy', title: 'Remote Work Policy (ระเบียบ WFH)', size: '1.1 MB', date: 'Feb 15, 2026' },{ name: 'Insurance_Claims', title: 'Health Insurance Claims (การเบิกประกัน)', size: '3.5 MB', date: 'Mar 01, 2026' }];
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;">${t('doc')}</h1><div class="card"><h2 style="margin-bottom: 16px;">Standard Operating Procedures (SOP)</h2>${docs.map(d => `<div class="policy-item"><div style="display:flex; align-items:center; gap:16px;"><div style="width:40px; height:40px; background:var(--accent-light); color:var(--accent); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px;">📄</div><div><div style="font-weight:600; color:var(--primary);">${d.title}</div><div style="font-size:12px; color:var(--text-muted);">Updated: ${d.date} • ${d.size}</div></div></div><button class="btn-outline" style="width:auto; font-size:12px;" onclick="App.downloadFile('${d.name}')">Download</button></div>`).join('')}</div></div>`;
    },
    'prof': () => {
        const u = AppState.currentUser.username;
        const p = AppState.profiles[u] || { email: '', phone: '', startDate: '' };
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;">${t('prof')}</h1><div class="grid-dash"><div class="card"><h2 style="margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">Personal Information</h2><div class="grid-2"><div><label>Full Name</label><input type="text" value="${AppState.currentUser.name}" disabled style="background:#f1f5f9; color:#94a3b8;"></div><div><label>Employee ID</label><input type="text" value="EMP-${u.toUpperCase()}" disabled style="background:#f1f5f9; color:#94a3b8;"></div><div><label>Department</label><input type="text" value="${AppState.currentUser.dept}" disabled style="background:#f1f5f9; color:#94a3b8;"></div><div><label>Start Date</label><input type="text" value="${p.startDate}" disabled style="background:#f1f5f9; color:#94a3b8;"></div><div><label>Email Address</label><input type="email" id="prof-email" value="${p.email}"></div><div><label>Contact Number</label><input type="text" id="prof-phone" value="${p.phone}"></div></div><div style="text-align:right; margin-top:16px;"><button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveProfile()">Save Changes</button></div></div><div class="card" style="text-align:center;"><img src="${p.avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=eff6ff&color=2563eb&size=150`}" id="prof-avatar-img" style="border-radius:50%; border: 4px solid var(--bg-main); margin-bottom: 16px; width:150px; height:150px; object-fit:cover;"><h2 style="margin:0;">${AppState.currentUser.name}</h2><p class="text-muted" style="margin-bottom:20px;">${AppState.currentUser.dept}</p><input type="file" id="avatar-upload" style="display:none;" accept="image/*" onchange="App.handleAvatarUpload(event)"><button class="btn-outline" onclick="document.getElementById('avatar-upload').click()">Upload New Photo</button></div></div></div>`;
    },

    'admin-dash': () => {
        const todayStr = new Date().toLocaleDateString('en-CA');
        let activeCount = 0;
        for (const user in AppState.dailyClock) { if (AppState.dailyClock[user].date === todayStr && AppState.dailyClock[user].status === 'in') activeCount++; }
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;">${t('admin_dash')}</h1><div class="grid-3" style="margin-bottom: 24px;"><div class="card" style="border-top: 4px solid var(--primary);"><h2>Total Employees</h2><div class="stat-value">${AppState.users.length}</div></div><div class="card" style="border-top: 4px solid var(--warning);"><h2>Pending Approvals</h2><div class="stat-value" style="color:var(--warning);">${AppState.requests.filter(r=>r.status==='Pending').length}</div></div><div class="card" style="border-top: 4px solid var(--success);"><h2>Active Today</h2><div class="stat-value" style="color:var(--success);">${activeCount}</div></div></div><div class="card"><h2 style="margin-bottom:16px;">Weekly Attendance Overview</h2><div style="height: 300px; width: 100%; position: relative;"><canvas id="adminDashChart"></canvas></div></div></div>`;
    },
    'admin-approve': () => {
        const p = AppState.requests.filter(r=>r.status==='Pending');
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;">${t('admin_appr')}</h1><div class="card table-wrapper" style="padding: 0;"><table style="margin:0;"><thead><tr><th>Employee</th><th>Request Info</th><th style="text-align:right;">Actions</th></tr></thead><tbody>${p.map(r=>`<tr><td><b style="font-size:14px; color:var(--primary);">${r.name}</b><br><span style="font-size:12px; color:var(--text-muted);">EMP-${r.u.toUpperCase()}</span></td><td><span class="badge" style="background:#f1f5f9; margin-bottom:4px;">${r.type}</span> <b style="font-size:13px;">${r.detail}</b><br><span class="my-tooltip" style="font-size:12px;">${r.reason}<span class="tooltip-box">รายละเอียด:<br>${r.reason}</span></span></td><td style="text-align:right;"><button class="btn-primary" style="background:var(--success); width:auto; padding:6px 14px; margin-right:4px;" onclick="App.actionReq(${r.id}, 'Approved')">${t('approve')}</button> <button class="btn-primary" style="background:var(--danger); width:auto; padding:6px 14px;" onclick="App.actionReq(${r.id}, 'Rejected')">${t('reject')}</button></td></tr>`).join('') || `<tr><td colspan="3" class="empty-state">🎉 All caught up! No pending requests.</td></tr>`}</tbody></table></div></div>`;
    },
    'admin-dir': () => {
        const currentUserRole = AppState.currentUser.role;
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="flex-between" style="margin-bottom:24px;">
                <h1 style="margin:0;">${t('admin_dir')}</h1>
                <div style="display:flex; gap:12px;">
                    <button class="btn-outline" onclick="App.exportToCSV()">📥 Export CSV</button>
                    <button class="btn-primary" style="width:auto;">+ Add Employee</button>
                </div>
            </div>
            <div class="card table-wrapper" style="padding:0;">
                <table style="margin:0;">
                    <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead>
                    <tbody>${AppState.users.map(u => {
                        const isActive = u.isActive !== false; 
                        const statusBadge = isActive ? 
                            `<span class="badge" style="background:#ecfdf5; color:#047857; border: 1px solid #a7f3d0;">${t('btn_active')}</span>` : 
                            `<span class="badge" style="background:#fef2f2; color:#b91c1c; border: 1px solid #fecaca;">${t('btn_inactive')}</span>`;
                        
                        const toggleBtnStr = isActive ? t('act_disable') : t('act_enable');
                        const toggleBtnColor = isActive ? `var(--danger)` : `var(--success)`;
                        
                        // 🟢 ปุ่ม Reset Password (ปุ่มกุญแจ) ให้สิทธิ์ IT กับ Admin
                        const resetBtn = (currentUserRole === 'admin' || currentUserRole === 'it') ? 
                            `<button class="btn-outline" style="padding:6px 10px; margin-right:4px; font-size:14px; background:#fef3c7; border-color:#fde68a;" onclick="App.resetPass('${u.username}')" title="Reset Password">🔑</button>` : '';

                        return `<tr>
                            <td>EMP-${u.username.toUpperCase()}</td>
                            <td><b>${u.name}</b><br><span style="font-size:12px; color:var(--text-muted);">${u.dept || '-'}</span></td>
                            <td><span class="badge" style="background:#f1f5f9;">${u.role.toUpperCase()}</span></td>
                            <td>${statusBadge}</td>
                            <td style="text-align:right; white-space:nowrap;">
                                ${resetBtn}
                                <button class="btn-outline" style="padding:6px 12px; font-size:12px; width:auto; margin-right: 4px;" onclick="App.openEditUser('${u.username}')">✏️ Edit</button>
                                <button class="btn-primary" style="background:${toggleBtnColor}; padding:6px 12px; font-size:12px; width:auto;" onclick="App.toggleUserStatus('${u.username}')">${toggleBtnStr}</button>
                            </td>
                        </tr>`;
                    }).join('')}</tbody>
                </table>
            </div>
        </div>
    `},
    'admin-rep': () => `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;">${t('admin_rep')}</h1><div class="grid-2"><div class="card"><h2 style="margin-bottom:16px;">Leave Distribution</h2><div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm);">Annual Leave: 65%<br>Sick Leave: 25%<br>Personal: 10%</div></div><div class="card"><h2 style="margin-bottom:16px;">Overtime Costs</h2><div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm);"><b style="font-size:24px; color:var(--primary);">฿ 124,500</b><br>Total OT payout this month</div></div></div></div>`,
    
    'admin-set': () => {
        const u = AppState.currentUser;
        let itSettingsSection = '';
        
        if (u.role === 'it') {
            itSettingsSection = `
                <hr style="margin:32px 0; border:0; border-top:1px dashed var(--border);">
                <h2 style="color:var(--danger); display:flex; align-items:center; gap:8px;">🛠️ Advanced IT Controls (Danger Zone)</h2>
                <div class="grid-2" style="margin-top:16px;">
                    <div style="background:#fef2f2; padding:16px; border-radius:8px; border:1px solid #fecaca;">
                        <h3 style="color:#b91c1c; margin-top:0; font-size:16px;">System Maintenance</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">เปิดโหมดปรับปรุงระบบ พนักงาน(ที่ไม่ใช่ไอที) จะไม่สามารถล็อกอินเข้าสู่ระบบได้</p>
                        <select id="set-maintenance" style="margin-bottom:12px; border-color:#fca5a5;">
                            <option value="off" ${!AppState.settings.maintenance ? 'selected' : ''}>🔴 ปิดโหมด Maintenance (ปกติ)</option>
                            <option value="on" ${AppState.settings.maintenance ? 'selected' : ''}>🟢 เปิดโหมด Maintenance (ระงับชั่วคราว)</option>
                        </select>
                    </div>
                    <div style="background:#eff6ff; padding:16px; border-radius:8px; border:1px solid #bfdbfe;">
                        <h3 style="color:#1d4ed8; margin-top:0; font-size:16px;">Database Management</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">สำรองข้อมูลทั้งหมดหรือล้างแคชระบบ (คำเตือน: โปรดสำรองข้อมูลก่อนล้างแคชเสมอ)</p>
                        <button class="btn-outline" style="width:100%; margin-bottom:8px; font-size:12px; background:white;" onclick="App.backupDB()">📥 Backup Database (.JSON)</button>
                        <button class="btn-primary" style="background:var(--danger); width:100%; font-size:12px;" onclick="App.clearCache()">🗑️ Clear System Cache</button>
                    </div>
                </div>
            `;
        }

        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;">${u.role === 'it' ? t('it_set') : t('admin_set')}</h1><div class="card" style="max-width:800px;"><h2>Global Configurations</h2><div class="grid-2"><div><label>Company Name</label><input type="text" id="set-company" value="${AppState.settings.companyName}"></div><div><label>Default Annual Leave Quota (Days)</label><input type="number" id="set-quota" value="${AppState.settings.leaveQuota}"></div></div><hr style="margin:24px 0; border:0; border-top:1px dashed var(--border);"><h2 style="color:#d97706;">📢 Broadcast Announcement</h2><p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">พิมพ์ข้อความที่ต้องการแจ้งเตือนพนักงานทุกคน (ลบออกเพื่อปิดการแจ้งเตือน)</p><textarea id="set-broadcast" rows="3" placeholder="เช่น พรุ่งนี้หยุดชดเชยสงกรานต์...">${AppState.settings.broadcast || ''}</textarea>
        ${itSettingsSection}
        <div style="text-align:right; margin-top:24px; padding-top:16px; border-top:1px solid var(--border);"><button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveSettings()">Save Configuration</button></div></div></div>`;
    }
};

function toggleSidebar() { document.querySelector('.sidebar').classList.toggle('show'); }
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return; 
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickHamburger = event.target.classList.contains('hamburger-btn');
    if (window.innerWidth <= 768 && sidebar.classList.contains('show') && (!isClickInsideSidebar || event.target.closest('.nav-item'))) {
        if(!isClickHamburger){ sidebar.classList.remove('show'); }
    }
});

// --- 6. Initialization ---
async function startApp() {
    await DB.load(); 
    applyLang(); 
    
    const savedUser = localStorage.getItem('hr_logged_user');
    if(savedUser) {
        const u = JSON.parse(savedUser);
        const serverUser = AppState.users.find(x => x.username === u.username);
        if (serverUser && serverUser.isActive === false) {
            localStorage.removeItem('hr_logged_user');
            alert(t('acc_locked'));
            document.getElementById('auth-view').style.display = 'flex';
            document.getElementById('app-view').style.display = 'none';
            return;
        }
        
        AppState.currentUser = u;
        App.boot();
    } else {
        document.getElementById('auth-view').style.display = 'flex';
        document.getElementById('app-view').style.display = 'none';
    }
}

startApp();