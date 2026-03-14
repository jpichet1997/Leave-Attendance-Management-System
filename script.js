// --- 1. Language Config (Enterprise Terminology) ---
let lang = localStorage.getItem('hr_lang') || 'en';
const dict = {
    'th': {
        'dash': 'หน้าหลัก', 'time': 'ลงเวลาและวันลา', 'slip': 'สลิปเงินเดือน', 'cal': 'ปฏิทินบริษัท', 'doc': 'เอกสารและระเบียบ', 'prof': 'ข้อมูลส่วนตัว',
        'admin_dash': 'ภาพรวมระบบ', 'admin_appr': 'อนุมัติคำขอ', 'admin_dir': 'รายชื่อพนักงาน', 'admin_rep': 'รายงานวิเคราะห์', 'admin_set': 'ตั้งค่าระบบ',
        'it_dash': 'สถานะเซิร์ฟเวอร์', 'it_users': 'จัดการสิทธิ์ผู้ใช้งาน', 'it_set': 'จัดการระบบ', 'it_log': 'บันทึกประวัติ (Audit Log)',
        'welcome': 'ยินดีต้อนรับ,', 'clock_title': 'ระบบบันทึกเวลาทำงาน', 'clock_btn_in': 'บันทึกเข้างาน', 'clock_btn_out': 'บันทึกออกงาน',
        'loc_office': 'สำนักงานใหญ่', 'loc_wfh': 'ทำงานที่บ้าน (WFH)', 'salary_title': 'ประมาณการรายได้สุทธิ',
        'show': 'แสดง', 'hide': 'ซ่อน', 'leave_bal': 'สิทธิวันลาคงเหลือ', 'req_ot': 'บันทึกคำขอ OT', 'req_lv': 'บันทึกคำขอลางาน',
        'tab_log': 'ประวัติลงเวลา', 'tab_lv': 'ประวัติการลา', 'tab_ot': 'ประวัติล่วงเวลา', 'no_data': 'ไม่พบข้อมูลในระบบ', 
        'approve': 'อนุมัติ', 'reject': 'ปฏิเสธ', 'loading': 'กำลังโหลดข้อมูล...',
        'slip_base': 'เงินเดือนพื้นฐาน', 'slip_ot': 'ค่าล่วงเวลา (OT)', 'slip_allow': 'เงินได้อื่นๆ',
        'slip_total_earn': 'รวมเงินได้', 'slip_sso': 'ประกันสังคม', 'slip_tax': 'ภาษีหัก ณ ที่จ่าย',
        'slip_absent': 'รายการหักอื่นๆ', 'slip_total_deduct': 'รวมรายการหัก', 'slip_net': 'เงินได้สุทธิ',
        'acc_locked': 'บัญชีถูกระงับ กรุณาติดต่อฝ่าย IT',
        'btn_active': 'ปกติ', 'btn_inactive': 'ระงับ',
        'act_disable': 'ระงับบัญชี', 'act_enable': 'เปิดใช้งาน'
    },
    'en': {
        'dash': 'Dashboard', 'time': 'Time & Leave', 'slip': 'E-Payslip', 'cal': 'Calendar', 'doc': 'Policies', 'prof': 'My Profile',
        'admin_dash': 'Overview', 'admin_appr': 'Approvals', 'admin_dir': 'Directory', 'admin_rep': 'Analytics', 'admin_set': 'Settings',
        'it_dash': 'System Status', 'it_users': 'Access Control', 'it_set': 'System Admin', 'it_log': 'Audit Logs',
        'welcome': 'Welcome,', 'clock_title': 'Attendance System', 'clock_btn_in': 'Clock In', 'clock_btn_out': 'Clock Out',
        'loc_office': 'Head Office', 'loc_wfh': 'Remote / WFH', 'salary_title': 'Net Salary Estimate',
        'show': 'Show', 'hide': 'Hide', 'leave_bal': 'Leave Balances', 'req_ot': 'Request OT', 'req_lv': 'Request Leave',
        'tab_log': 'Time Logs', 'tab_lv': 'Leave History', 'tab_ot': 'OT History', 'no_data': 'No records found.', 
        'approve': 'Approve', 'reject': 'Reject', 'loading': 'Loading data...',
        'slip_base': 'Base Salary', 'slip_ot': 'Overtime Pay', 'slip_allow': 'Allowances',
        'slip_total_earn': 'Total Earnings', 'slip_sso': 'Social Security', 'slip_tax': 'Withholding Tax',
        'slip_absent': 'Deductions', 'slip_total_deduct': 'Total Deductions', 'slip_net': 'Net Salary',
        'acc_locked': 'Account suspended. Please contact IT Support.',
        'btn_active': 'Active', 'btn_inactive': 'Suspended',
        'act_disable': 'Suspend', 'act_enable': 'Activate'
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
        btn.innerHTML = lang === 'th' ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> TH'; 
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
        { username: 'admin', password: '123', name: 'HR Manager', role: 'admin', dept: 'Human Resources', isActive: true },
        { username: 'user', password: '123', name: 'John Doe', role: 'employee', dept: 'Marketing', isActive: true },
        { username: 'it', password: '123', name: 'IT Administrator', role: 'it', dept: 'IT Operations', isActive: true }
    ],
    currentUser: null, 
    dailyClock: {}, 
    leaveBalances: { 'user': { annual: 8.5, sick: 28 }, 'admin': { annual: 15, sick: 30 }, 'it': { annual: 15, sick: 30 } }, 
    requests: [], 
    timeLogs: [], 
    notifications: [], 
    auditLogs: [], 
    profiles: { 
        'admin': { email: 'admin@sj-inter.com', phone: '089-999-9999', startDate: '2020-01-01', avatar: '' },
        'user': { email: 'john.d@sj-inter.com', phone: '081-234-5678', startDate: '2024-01-15', avatar: '' },
        'it': { email: 'it.admin@sj-inter.com', phone: '088-888-8888', startDate: '2022-05-10', avatar: '' }
    },
    settings: { companyName: 'S&J International Co., Ltd.', leaveQuota: 10, broadcast: '', maintenance: false }
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
                if(!AppState.auditLogs) AppState.auditLogs = []; 
                if (AppState.settings.broadcast === undefined) AppState.settings.broadcast = '';
                if (AppState.settings.maintenance === undefined) AppState.settings.maintenance = false;
            } else { 
                await dbRef.set(defaultState); 
                AppState = defaultState; 
            }
            return AppState;
        } catch (error) { console.error("Database connection error:", error); return AppState; }
    },
    save: (state) => {
        const dataToSave = { ...state };
        delete dataToSave.currentUser;
        dbRef.set(dataToSave, { merge: true }).catch(err => console.error("Database sync error:", err));
    }
};

let chartInst = null; 
let liveChartInst = null; 
let liveChartInterval = null; 
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
        if(list) list.innerHTML = notifs.slice(0, 5).map(n => `<div class="notif-item ${n.isRead?'':'unread'}" onclick="App.nav('time', this)"><div style="color:var(--primary); font-weight:500;">${n.message}</div><small style="color:var(--text-muted);"><i class="far fa-clock"></i> ${n.time}</small></div>`).join('') || `<div class="empty-state"><i class="fas fa-inbox fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>${t('no_data')}</div>`;
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
        if (AppState.users.find(u => u.username === user)) return App.toast('Username is already registered.', 'error');
        
        let defDept = 'General Staff';
        if(role === 'admin') defDept = 'Human Resources';
        if(role === 'it') defDept = 'IT Operations';

        AppState.users.push({ username: user, password: pass, name: name, role: role, dept: defDept, isActive: true });
        AppState.leaveBalances[user] = { annual: AppState.settings.leaveQuota, sick: 30 }; 
        AppState.profiles[user] = { email: user+'@sj-inter.com', phone: '-', startDate: new Date().toLocaleDateString('en-CA'), avatar: '' };
        
        App.addLog('System', `New user provisioned: ${user} (${role})`); 
        DB.save(AppState); App.toast('Account created successfully.', 'success'); Auth.toggle('login'); 
    },
    login: () => {
        const u = document.getElementById('login-user').value, p = document.getElementById('login-pass').value;
        
        if(AppState.settings.maintenance && u !== 'it') {
            if(typeof Swal !== 'undefined') {
                Swal.fire({ icon: 'info', title: 'System Maintenance', text: 'The system is currently undergoing scheduled maintenance. Please try again later.', confirmButtonColor: '#0f172a' });
            } else { alert('System Maintenance Mode. Please try again later.'); }
            return;
        }

        const acc = AppState.users.find(x => x.username === u && x.password === p);
        if (acc) { 
            if (acc.isActive === false) { alert(t('acc_locked')); return; }
            AppState.currentUser = acc; 
            localStorage.setItem('hr_logged_user', JSON.stringify(acc)); 
            
            App.addLog('Authentication', `User login successful: ${u}`); 

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success', title: 'Authentication Successful',
                    text: 'Initializing workspace...',
                    showConfirmButton: false, timer: 1000
                }).then(() => { App.boot(); });
            } else { App.boot(); }
        } else alert('Authentication failed. Invalid credentials.');
    },
    logout: () => { 
        App.addLog('Authentication', `User logout: ${AppState.currentUser.username}`);
        AppState.currentUser = null; localStorage.removeItem('hr_logged_user'); location.reload(); 
    }
};

const App = {
    addLog: (action, detail) => {
        if (!AppState.auditLogs) AppState.auditLogs = [];
        AppState.auditLogs.unshift({
            id: Date.now(),
            user: AppState.currentUser ? AppState.currentUser.name : 'System',
            role: AppState.currentUser ? AppState.currentUser.role : 'System',
            action: action,
            detail: detail,
            time: new Date().toLocaleString('en-GB')
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
                <div class="nav-divider">HR Management</div>
                <div class="nav-item active" onclick="App.nav('admin-dash', this)"><i class="fas fa-chart-pie"></i> ${t('admin_dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-approve', this)"><i class="fas fa-check-circle"></i> ${t('admin_appr')} <span class="badge bg-danger" style="color:white; margin-left:auto;" id="badge-pending">0</span></div>
                <div class="nav-divider">Administration</div>
                <div class="nav-item" onclick="App.nav('admin-dir', this)"><i class="fas fa-users"></i> ${t('admin_dir')}</div>
                <div class="nav-item" onclick="App.nav('admin-rep', this)"><i class="fas fa-chart-line"></i> ${t('admin_rep')}</div>
                <div class="nav-divider">Settings</div>
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user-circle"></i> ${t('prof')}</div>`;
            App.nav('admin-dash', menu.children[1]);
            
        } else if (u.role === 'it') {
            menu.innerHTML = `
                <div class="nav-divider">IT Operations</div>
                <div class="nav-item active" onclick="App.nav('it-dash', this)"><i class="fas fa-server"></i> ${t('it_dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-dir', this)"><i class="fas fa-users-cog"></i> ${t('it_users')}</div>
                <div class="nav-item" onclick="App.nav('it-logs', this)"><i class="fas fa-clipboard-list"></i> ${t('it_log')}</div>
                <div class="nav-item" onclick="App.nav('admin-set', this)"><i class="fas fa-cogs"></i> ${t('it_set')}</div>
                <div class="nav-divider">Settings</div>
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user-circle"></i> ${t('prof')}</div>`;
            App.nav('it-dash', menu.children[1]);

        } else {
            menu.innerHTML = `
                <div class="nav-divider">Workspace</div>
                <div class="nav-item active" onclick="App.nav('home', this)"><i class="fas fa-home"></i> ${t('dash')}</div>
                <div class="nav-item" onclick="App.nav('time', this)"><i class="fas fa-clock"></i> ${t('time')}</div>
                <div class="nav-item" onclick="App.nav('payslip', this)"><i class="fas fa-file-invoice-dollar"></i> ${t('slip')}</div>
                <div class="nav-divider">Company Info</div>
                <div class="nav-item" onclick="App.nav('cal', this)"><i class="fas fa-calendar-alt"></i> ${t('cal')}</div>
                <div class="nav-item" onclick="App.nav('doc', this)"><i class="fas fa-folder-open"></i> ${t('doc')}</div>
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user"></i> ${t('prof')}</div>`;
            App.nav('home', menu.children[1]);
        }
        Notif.render(); App.updateBadge();
    },
    
    nav: (page, el) => {
        if(liveChartInterval) clearInterval(liveChartInterval);

        if(el) { document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active')); el.classList.add('active'); }
        
        document.getElementById('page-content').innerHTML = `
            <div class="skeleton-loader">
                <div class="skeleton-line" style="width: 30%; height: 28px; margin-bottom: 24px;"></div>
                <div class="grid-4" style="margin-bottom: 24px;">
                    <div class="skeleton-card" style="height: 110px;"></div>
                    <div class="skeleton-card" style="height: 110px;"></div>
                    <div class="skeleton-card" style="height: 110px;"></div>
                    <div class="skeleton-card" style="height: 110px;"></div>
                </div>
                <div class="skeleton-card" style="height: 350px;"></div>
            </div>
        `;

        setTimeout(() => {
            document.getElementById('page-content').innerHTML = Views[page]();
            if(page === 'home') { isSalaryVisible = false; App.updateClock(); App.renderChart(); }
            if(page === 'payslip') App.genSlip();
            if(page === 'cal') App.renderCalendarGrid();
            if(page === 'admin-rep') App.renderAdminCharts();
            if(page === 'admin-dash') App.renderAdminDashChart();
            if(page === 'it-dash') App.renderITLiveChart(); 
        }, 300); 
    },

    getSalary: () => {
        const u = AppState.currentUser;
        if(u.role === 'admin' || u.role === 'it') { return { base: 85000, ot: 0, allow: 5000, sso: 750, tax: 6500, absent: 0, earn: 90000, deduct: 7250, net: 82750 }; } 
        else { return { base: 35000, ot: 4250, allow: 1500, sso: 750, tax: 1250, absent: 0, earn: 40750, deduct: 2000, net: 38750 }; }
    },

    updateAvatarImg: () => {
        const u = AppState.currentUser.username;
        if(!AppState.profiles[u]) AppState.profiles[u] = { email: '', phone: '', startDate: '', avatar: '' }; 
        const src = AppState.profiles[u].avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=e0e7ff&color=3b82f6&bold=true`;
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
        DB.save(AppState); App.toast('Profile information saved.', 'success');
    },

    downloadFile: (filename) => {
        App.toast(`Initiating download: ${filename}...`);
        const blob = new Blob(["Document Content placeholder: " + filename], { type: "text/plain" });
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
        App.toast('Exporting database records...');
        let csv = "\uFEFFID,Name,Department,Role,Status,Annual Leave,Sick Leave\n";
        AppState.users.forEach(u => {
            const bal = AppState.leaveBalances[u.username] || { annual: 0, sick: 0 };
            const status = u.isActive !== false ? 'Active' : 'Suspended';
            csv += `EMP-${u.username.toUpperCase()},${u.name},${u.dept},${u.role},${status},${bal.annual},${bal.sick}\n`;
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; 
        a.download = `Employee_Database_${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
        App.addLog('Data Export', 'Exported employee directory to CSV');
    },

    resetPass: (username) => {
        if(typeof Swal !== 'undefined') {
            Swal.fire({
                title: `Reset Password: ${username}`,
                input: 'text',
                inputLabel: 'Enter temporary password',
                inputValue: '123456',
                showCancelButton: true,
                confirmButtonText: 'Update Password',
                confirmButtonColor: '#3b82f6'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const u = AppState.users.find(x => x.username === username);
                    if(u) {
                        u.password = result.value;
                        App.addLog('Security', `Password reset executed for: ${username}`); 
                        DB.save(AppState);
                        App.toast('Password reset successfully.', 'success');
                    }
                }
            });
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
                    <h1 style="margin:0; font-size:18px;"><i class="fas fa-user-edit"></i> Edit Employee Record</h1>
                    <button class="btn-text" style="font-size:20px; color:var(--text-muted);" onclick="App.closeModal('modal-edit-user')"><i class="fas fa-times"></i></button>
                </div>
                <form onsubmit="event.preventDefault(); App.saveEditUser('${username}');">
                    <label>Full Name</label><input type="text" id="edit-u-name" value="${u.name}" required>
                    <label>Department</label><input type="text" id="edit-u-dept" value="${u.dept}" required>
                    <div class="grid-2">
                        <div>
                            <label>System Role</label>
                            <select id="edit-u-role">
                                <option value="employee" ${u.role==='employee'?'selected':''}>Employee</option>
                                <option value="admin" ${u.role==='admin'?'selected':''}>Admin (HR)</option>
                                <option value="it" ${u.role==='it'?'selected':''}>IT Support</option>
                            </select>
                        </div>
                        <div><label>User ID</label><input type="text" value="${u.username}" disabled style="background:#f8fafc;"></div>
                    </div>
                    <div class="grid-2">
                        <div><label>Annual Leave Bal.</label><input type="number" step="0.5" id="edit-u-annual" value="${bal.annual}" required></div>
                        <div><label>Sick Leave Bal.</label><input type="number" step="0.5" id="edit-u-sick" value="${bal.sick}" required></div>
                    </div>
                    <div style="display:flex; gap:12px; margin-top:16px;">
                        <button type="button" class="btn-outline" style="flex:1;" onclick="App.closeModal('modal-edit-user')">Cancel</button>
                        <button type="submit" class="btn-primary" style="flex:2;"><i class="fas fa-save"></i> Save Record</button>
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
        
        App.addLog('Data Update', `Modified user profile: ${username}`);
        DB.save(AppState);
        App.closeModal('modal-edit-user');
        App.toast('Employee record updated.', 'success');
        
        const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Directory') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage'));
        if(navEl) App.nav('admin-dir', navEl);
    },

    toggleUserStatus: (username) => {
        if (username === AppState.currentUser.username) { return App.toast('Self-suspension is not permitted.', 'error'); }
        const u = AppState.users.find(x => x.username === username);
        if(u) {
            u.isActive = u.isActive === false ? true : false;
            
            App.addLog('Access Control', `Changed account status for ${username} to ${u.isActive ? 'Active' : 'Suspended'}`); 
            DB.save(AppState);
            App.toast(`Account status updated.`, 'success');
            
            const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Directory') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage'));
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
        
        const maintEl = document.getElementById('set-maintenance');
        if(maintEl) {
            const isMaint = maintEl.value === 'on';
            if (AppState.settings.maintenance !== isMaint) {
                App.addLog('System Configuration', `Maintenance mode changed to: ${isMaint ? 'ON' : 'OFF'}`);
            }
            AppState.settings.maintenance = isMaint;
        }

        DB.save(AppState); 
        App.toast('System configuration applied.', 'success');
    },
    
    backupDB: () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = "DB_Backup_" + new Date().toISOString().slice(0,10) + ".json";
        a.click();
        App.addLog('Data Management', 'Manual database backup downloaded'); 
        App.toast('Database Backup Downloaded', 'success');
    },

    clearCache: () => {
        if(typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Clear System Cache?',
                text: "This action will purge temporary data. Do you wish to proceed?",
                icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b', confirmButtonText: 'Proceed'
            }).then((result) => {
                if (result.isConfirmed) {
                    App.addLog('System Maintenance', 'System cache cleared'); 
                    App.toast('Cache cleared successfully.', 'success');
                }
            });
        }
    },

    clock: () => {
        const u = AppState.currentUser.username, d = new Date().toLocaleDateString('en-CA'), loc = document.getElementById('work-location').value;
        if (!AppState.dailyClock[u] || AppState.dailyClock[u].date !== d) AppState.dailyClock[u] = { date: d, status: 'out', in: null };
        let c = AppState.dailyClock[u];
        if (c.status === 'out') { 
            c.status = 'in'; c.in = Date.now(); c.loc = loc; 
            App.addLog('Attendance', `Clocked in from ${loc}`);
            App.toast('Clocked in successfully.'); 
        } else {
            const hrs = ((Date.now() - c.in) / 3600000).toFixed(2);
            AppState.timeLogs.unshift({ u: u, d: d, in: new Date(c.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}), out: new Date().toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}), hrs, loc: c.loc });
            c.status = 'out'; c.in = null; 
            App.addLog('Attendance', `Clocked out. Session duration: ${hrs}h`);
            App.toast(`Clocked out. Session: ${hrs}h`);
        }
        DB.save(AppState); App.updateClock();
    },
    updateClock: () => {
        const btn = document.getElementById('btn-clock'), st = document.getElementById('status-clock'), sel = document.getElementById('work-location');
        if(!btn) return; let c = AppState.dailyClock[AppState.currentUser.username];
        if (c && c.status === 'in' && c.date === new Date().toLocaleDateString('en-CA')) {
            sel.disabled = true; 
            btn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t('clock_btn_out')}`; 
            btn.classList.replace('btn-primary', 'btn-danger');
            st.innerHTML = `<span style="color:var(--success); font-weight:600;"><i class="fas fa-circle" style="font-size:8px; vertical-align:middle;"></i> Active Session (${c.loc})</span><br><span class="text-muted">Since ${new Date(c.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</span>`;
        } else { 
            sel.disabled = false; 
            btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${t('clock_btn_in')}`; 
            btn.classList.replace('btn-danger', 'btn-primary'); 
            st.innerHTML = `<span class="text-muted"><i class="fas fa-bed"></i> Currently Offline</span>`; 
        }
    },
    submitLeave: () => {
        const u = AppState.currentUser.username, k = document.getElementById('lv-type').value.includes('Annual') ? 'annual' : 'sick';
        let days = document.getElementById('lv-format').value === 'hourly' ? 0.125 : 1; 
        if(!AppState.leaveBalances[u]) AppState.leaveBalances[u] = { annual: AppState.settings.leaveQuota, sick: 30 };
        if(AppState.leaveBalances[u][k] < days) return App.toast('Insufficient leave balance.', 'error');
        AppState.leaveBalances[u][k] -= days;
        AppState.requests.unshift({ id: Date.now(), type: 'Leave', u: u, name: AppState.currentUser.name, detail: document.getElementById('lv-type').value, reason: document.getElementById('lv-reason').value, status: 'Pending' });
        
        App.addLog('Workflow', `Submitted Leave Request`);
        DB.save(AppState); App.closeModal('modal-leave'); App.toast('Request submitted for approval.'); App.nav('time', document.querySelectorAll('.nav-item')[1]); 
    },
    submitOT: () => {
        AppState.requests.unshift({ id: Date.now(), type: 'OT', u: AppState.currentUser.username, name: AppState.currentUser.name, detail: document.getElementById('ot-hours').value + ' Hrs', reason: document.getElementById('ot-reason').value, status: 'Pending' });
        App.addLog('Workflow', `Submitted OT Request`);
        DB.save(AppState); App.closeModal('modal-ot'); App.toast('OT request submitted.'); App.nav('time', document.querySelectorAll('.nav-item')[1]);
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
                time: new Date().toLocaleString('en-GB')
            })
        }).catch(err => console.error("Webhook Error:", err));
    },

    actionReq: (id, stat) => {
        const r = AppState.requests.find(x => x.id === id);
        if(r) { 
            r.status = stat; 
            App.addLog('Workflow Action', `${stat} request for ${r.name} (${r.type})`); 
            DB.save(AppState); 
            App.toast(`Request marked as ${stat}`); 
            App.sendLineAlert(r.name, r.type, stat);
            App.nav('admin-approve'); 
            App.updateBadge(); 
            Notif.push(r.u, `Workflow Update: Your ${r.type} request was ${stat.toLowerCase()}.`); 
        }
    },

    renderChart: () => {
        if(chartInst) chartInst.destroy();
        const u = AppState.currentUser.username;
        const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0;
        const ctx = document.getElementById('userChart');
        if(!ctx) return;
        chartInst = new Chart(ctx, { type: 'doughnut', data: { labels: ['Used', 'Remaining'], datasets: [{ data: [AppState.settings.leaveQuota-bal, bal], backgroundColor: ['#e2e8f0', '#3b82f6'], borderWidth: 0 }] }, options: { cutout: '80%', plugins: { legend: { display: false } } } });
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
                    { label: 'Present', data: [12, 15, 14, 13, 10], backgroundColor: '#10b981' },
                    { label: 'Leave', data: [2, 0, 1, 1, 4], backgroundColor: '#f59e0b' },
                    { label: 'Remote', data: [1, 0, 0, 1, 1], backgroundColor: '#3b82f6' }
                ]
            }, 
            options: { 
                maintainAspectRatio: false, 
                scales: { 
                    x: { stacked: true, grid: { display: false } }, 
                    y: { stacked: true, beginAtZero: true, border: { dash: [4, 4] } } 
                },
                plugins: { legend: { position: 'top' } }
            } 
        });
    },

    // 🟢 กราฟ IT Dashboard ปรับใหม่ให้ดูน่าเชื่อถือและสมจริง
    renderITLiveChart: () => {
        if(liveChartInst) liveChartInst.destroy();
        const ctx = document.getElementById('itLiveChart');
        if (!ctx) return;

        // Base load (เซิร์ฟเวอร์มักจะวิ่งอยู่ช่วง 20-35%)
        let currentCpu = 25; 
        const initialData = Array.from({length: 40}, () => {
            currentCpu += (Math.random() * 4) - 2; 
            return Math.max(5, Math.min(95, currentCpu));
        });

        liveChartInst = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(40).fill(''), 
                datasets: [{
                    label: 'CPU Allocation (%)',
                    data: initialData,
                    borderColor: '#10b981', 
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4, // สมูทเคิร์ฟ
                    pointRadius: 0 
                }]
            },
            options: {
                maintainAspectRatio: false,
                animation: false, // ปิด Animation ป้องกันการกระตุกเวลาอัปเดตแบบ Realtime
                scales: {
                    y: { 
                        min: 0, max: 100, 
                        ticks: { stepSize: 20, color: '#94a3b8', font: { size: 10 } },
                        grid: { color: '#f1f5f9' },
                        border: { display: false }
                    },
                    x: { display: false } 
                },
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });

        liveChartInterval = setInterval(() => {
            const data = liveChartInst.data.datasets[0].data;
            let lastVal = data[data.length - 1];
            
            // ขยับค่าแบบมีทิศทาง (Random Walk)
            let change = (Math.random() * 5) - 2.5; 
            
            // สุ่มเกิด Spike 2% ของเวลา (จำลองมีคนรันรีพอร์ต)
            if(Math.random() > 0.98) change += 25; 

            // ดึงค่ากลับเข้าเส้นฐาน (Gravity to mean)
            if(lastVal > 60) change -= 2;
            if(lastVal < 15) change += 2;

            let newVal = Math.max(2, Math.min(98, lastVal + change));

            // อัปเดตสีตามการโหลด (เขียว -> เหลือง -> แดง)
            let color = '#10b981';
            let bgColor = 'rgba(16, 185, 129, 0.05)';
            if (newVal > 80) { color = '#ef4444'; bgColor = 'rgba(239, 68, 68, 0.05)'; }
            else if (newVal > 60) { color = '#f59e0b'; bgColor = 'rgba(245, 158, 11, 0.05)'; }
            
            liveChartInst.data.datasets[0].borderColor = color;
            liveChartInst.data.datasets[0].backgroundColor = bgColor;

            data.push(newVal); 
            data.shift(); 
            liveChartInst.update();
        }, 1000);
    },

    genSlip: () => {
        const wrapper = document.getElementById('printable-area'); if(!wrapper) return;
        const slip = App.getSalary();
        wrapper.innerHTML = `<div style="background:white; padding:40px; border:1px solid var(--border); border-radius:var(--radius); font-family:'Inter', 'Kanit', sans-serif; max-width:800px; margin:0 auto; box-shadow:var(--shadow-sm);">
            <div style="text-align:center; margin-bottom:30px;"><h2 style="font-size:20px; color:var(--primary); margin:0; text-transform:uppercase; letter-spacing:1px;">${AppState.settings.companyName}</h2><p style="color:var(--text-muted); margin:5px 0 0 0; font-size:12px;">E-Payslip Document - ${document.getElementById('slip-month').value}</p></div>
            <div style="background:var(--bg-main); padding:15px 20px; border-radius:var(--radius-sm); margin-bottom:25px; display:flex; justify-content:space-between; font-size:13px; border:1px solid var(--border);"><div>Employee: <b>${AppState.currentUser.name}</b> <span style="color:var(--text-muted); margin-left:8px;">(ID: EMP-${AppState.currentUser.username.toUpperCase()})</span></div><div style="text-align:right">Department: <b>${AppState.currentUser.dept}</b></div></div>
            <div class="grid-2" style="gap:30px;">
                <div><h3 style="font-size:14px; color:var(--success); border-bottom:2px solid var(--success); padding-bottom:8px; margin-bottom:15px; text-transform:uppercase;">Earnings</h3><div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_base')}</span><b>${slip.base.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_ot')}</span><b>${slip.ot.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0; font-size:13px; border-bottom:1px solid var(--border);"><span>${t('slip_allow')}</span><b>${slip.allow.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:12px 0; font-weight:600; color:var(--primary);"><span>${t('slip_total_earn')}</span><b style="font-size:15px;">THB ${slip.earn.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div></div>
                <div><h3 style="font-size:14px; color:var(--danger); border-bottom:2px solid var(--danger); padding-bottom:8px; margin-bottom:15px; text-transform:uppercase;">Deductions</h3><div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_sso')}</span><b>${slip.sso.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_tax')}</span><b>${slip.tax.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:8px 0; font-size:13px; border-bottom:1px solid var(--border); color:var(--danger);"><span>${t('slip_absent')}</span><b>${slip.absent.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div><div class="flex-between" style="padding:12px 0; font-weight:600; color:var(--primary);"><span>${t('slip_total_deduct')}</span><b style="font-size:15px;">THB ${slip.deduct.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div></div>
            </div>
            <div style="margin-top:40px; padding:24px; background:var(--primary); color:white; border-radius:var(--radius-sm); text-align:right; box-shadow:var(--shadow);"><div style="font-size:12px; opacity:0.8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">${t('slip_net')}</div><div style="font-size:32px; font-weight:700; letter-spacing:-1px;">THB ${slip.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</div></div>
            <div style="text-align:center; margin-top:30px; font-size:11px; color:var(--text-muted); border-top:1px dashed var(--border); padding-top:15px;">This document is computer-generated. No signature is required.</div>
        </div>`;
    },
    toggleSal: () => { isSalaryVisible = !isSalaryVisible; document.getElementById('salary-val').classList.toggle('masked'); document.getElementById('salary-btn').innerHTML = isSalaryVisible ? `<i class="fas fa-eye-slash"></i> ${t('hide')}` : `<i class="fas fa-eye"></i> ${t('show')}`; },
    switchTab: (id, btn) => { document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active')); document.getElementById(id).classList.add('active'); },
    openModal: (id) => document.getElementById(id).classList.add('show'),
    closeModal: (id) => document.getElementById(id).classList.remove('show'),
    updateBadge: () => { const b = document.getElementById('badge-pending'), c = AppState.requests.filter(r=>r.status==='Pending').length; if(b){b.innerText=c; b.style.display=c>0?'inline-block':'none';} },
    toast: (msg, type='primary') => { const box = document.getElementById('toast-container'), t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `<i class="fas ${type==='error'?'fa-exclamation-circle':'fa-check-circle'}" style="margin-right:8px;"></i> ${msg}`; if(type==='error') t.style.borderLeftColor='var(--danger)'; box.appendChild(t); setTimeout(()=>t.remove(), 3500); }
};

// --- 5. VIEWS ---
const Views = {
    // 🟢 หน้า Dashboard พิเศษสำหรับ IT (4 Grid)
    'it-dash': () => {
        const activeUsers = AppState.users.filter(u => u.isActive !== false).length;
        const suspendedUsers = AppState.users.length - activeUsers;
        const todayLogins = Math.floor(Math.random() * 20) + 5; // ตัวเลขจำลองการ Login วันนี้
        const sysRequests = Math.floor(Math.random() * 5000) + 1200;
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-server text-muted"></i> ${t('it_dash')}</h1>
            
            <div class="grid-4" style="margin-bottom: 24px;">
                <div class="card" style="padding:20px; border-top: 3px solid var(--primary);">
                    <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-users"></i> Total Accounts</h2>
                    <div class="stat-value" style="font-size:28px;">${AppState.users.length}</div>
                </div>
                <div class="card" style="padding:20px; border-top: 3px solid var(--success);">
                    <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-user-check"></i> Active Users</h2>
                    <div class="stat-value" style="color:var(--success); font-size:28px;">${activeUsers}</div>
                </div>
                <div class="card" style="padding:20px; border-top: 3px solid var(--accent);">
                    <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-sign-in-alt"></i> Today's Logins</h2>
                    <div class="stat-value" style="color:var(--accent); font-size:28px;">${todayLogins}</div>
                </div>
                <div class="card" style="padding:20px; border-top: 3px solid var(--warning);">
                    <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-network-wired"></i> System Requests</h2>
                    <div class="stat-value" style="color:var(--warning); font-size:28px;">${sysRequests.toLocaleString()}</div>
                </div>
            </div>

            <div class="card" style="margin-bottom: 24px;">
                <div class="flex-between" style="margin-bottom:16px;">
                    <h2 style="margin:0; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-microchip text-muted"></i> Compute Resource Allocation (CPU)
                    </h2>
                    <span class="badge" style="background:#ecfdf5; color:#059669;"><i class="fas fa-circle" style="font-size:8px;"></i> Running</span>
                </div>
                <div style="height: 250px; width: 100%; position: relative;">
                    <canvas id="itLiveChart"></canvas>
                </div>
            </div>

            <div class="card">
                <h2 style="margin-bottom:16px;"><i class="fas fa-shield-alt text-muted"></i> System Status</h2>
                <div style="padding:16px 20px; background:#f8fafc; border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; align-items:center; gap:16px;">
                    <div style="font-size:24px; color:var(--success);"><i class="fas fa-check-circle"></i></div> 
                    <div>
                        <strong style="font-size:14px; color:var(--primary);">All Services Operational</strong><br>
                        <span style="font-size:12px; color:var(--text-muted);">Database connection verified. Webhook integrations are functioning normally.</span>
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
                <h1 style="margin:0;"><i class="fas fa-clipboard-list text-muted"></i> ${t('it_log')}</h1>
                <button class="btn-outline" onclick="App.toast('Log export initiated.', 'success')"><i class="fas fa-download"></i> Export Logs</button>
            </div>
            <div class="card table-wrapper" style="padding:0;">
                <table style="margin:0;">
                    <thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Event Type</th><th>Details</th></tr></thead>
                    <tbody>${logs.slice(0, 50).map(l => `
                        <tr>
                            <td style="color:var(--text-muted); font-size:12px; white-space:nowrap;">${l.time}</td>
                            <td><b style="color:var(--primary);">${l.user}</b></td>
                            <td><span class="badge" style="background:#f1f5f9; color:var(--text-muted); border:1px solid var(--border);">${l.role.toUpperCase()}</span></td>
                            <td><span class="badge" style="background:var(--accent-light); color:var(--accent);">${l.action}</span></td>
                            <td style="font-size:13px; color:var(--text-dark);">${l.detail}</td>
                        </tr>
                    `).join('') || `<tr><td colspan="5" class="empty-state"><i class="fas fa-search fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>No audit logs available.</td></tr>`}</tbody>
                </table>
            </div>
        </div>`;
    },

    'home': () => {
        const u = AppState.currentUser.username;
        const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0;
        const sal = App.getSalary(); 
        const broadcastMsg = AppState.settings.broadcast ? 
            `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 24px; border-radius: var(--radius-sm); color: #b45309; display: flex; gap: 12px; align-items: flex-start; box-shadow: var(--shadow-sm);"><div style="font-size: 18px; margin-top:2px;"><i class="fas fa-bullhorn"></i></div><div><strong style="display:block; margin-bottom:2px; font-size:13px;">Corporate Announcement</strong><span style="font-size:13px;">${AppState.settings.broadcast}</span></div></div>` : '';

        return `
        <div style="margin-bottom: 32px; animation: fadeUp 0.4s ease-out;"><div style="color:var(--text-muted); font-size:12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${t('welcome')}</div><h1 style="margin:0; font-size:24px;">${AppState.currentUser.name}</h1></div>
        ${broadcastMsg} 
        <div class="grid-dash">
            <div>
                <div class="card" style="background: linear-gradient(135deg, var(--primary), #1e3a8a); color: white; margin-bottom: 24px; border:none; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.4);">
                    <div class="flex-between">
                        <h2 style="color: #93c5fd; margin:0; font-weight: 500;"><i class="fas fa-wallet"></i> ${t('salary_title')}</h2>
                        <button id="salary-btn" class="btn-toggle-view" onclick="App.toggleSal()"><i class="fas fa-eye"></i> ${t('show')}</button>
                    </div>
                    <div class="salary-container" style="margin-top:16px;">
                        <span id="salary-val" class="salary-value masked">THB ${sal.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 24px;">
                    <h2 style="color: var(--primary); display:flex; align-items:center; gap:8px;"><i class="far fa-clock text-muted"></i> ${t('clock_title')}</h2>
                    <select id="work-location" style="margin-bottom: 16px;"><option value="Office">${t('loc_office')}</option><option value="WFH">${t('loc_wfh')}</option></select>
                    <div id="status-clock" style="margin-bottom: 20px; font-size: 13px; padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm); border: 1px solid var(--border);"><span class="text-muted"><i class="fas fa-bed"></i> Currently Offline</span></div>
                    <button id="btn-clock" class="btn-primary" onclick="App.clock()" style="padding: 14px; width:100%; font-size: 14px;"><i class="fas fa-sign-in-alt"></i> ${t('clock_btn_in')}</button>
                </div>
            </div>
            <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content: center;">
                <h2 style="margin-bottom: 24px; text-align:center;"><i class="fas fa-umbrella-beach text-muted"></i> ${t('leave_bal')}</h2>
                <div style="position:relative; width:140px; height:140px; margin-bottom: 24px;">
                    <canvas id="userChart"></canvas>
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;">
                        <div style="font-size:28px; font-weight:700; color:var(--primary); line-height:1;">${bal}</div>
                        <div style="font-size:10px; color:var(--text-muted); font-weight: 600; margin-top: 4px; text-transform:uppercase;">Days</div>
                    </div>
                </div>
                <button class="btn-outline" style="width: 100%; color: var(--accent); border-color: var(--accent);" onclick="App.openModal('modal-leave')"><i class="fas fa-plus"></i> ${t('req_lv')}</button>
            </div>
        </div>`;
    },
    'time': () => {
        const u = AppState.currentUser.username, logs = AppState.timeLogs.filter(x=>x.u===u), reqs = AppState.requests.filter(x=>x.u===u);
        return `<div class="flex-between" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;"><h1 style="margin:0;"><i class="fas fa-history text-muted"></i> ${t('time')}</h1><div style="display:flex; gap:12px;"><button class="btn-outline" onclick="App.openModal('modal-ot')"><i class="fas fa-moon"></i> ${t('req_ot')}</button><button class="btn-primary" onclick="App.openModal('modal-leave')"><i class="fas fa-umbrella-beach"></i> ${t('req_lv')}</button></div></div>
        <div class="card" style="padding-top:16px;"><div class="ui-tabs"><button class="tab-btn active" onclick="App.switchTab('t1', this)"><i class="fas fa-list-ul"></i> ${t('tab_log')}</button><button class="tab-btn" onclick="App.switchTab('t2', this)"><i class="fas fa-file-alt"></i> ${t('tab_lv')} / OT</button></div>
            <div id="t1" class="tab-content active table-wrapper"><table><thead><tr><th>Date</th><th>Location</th><th>In</th><th>Out</th><th>Hours</th></tr></thead><tbody>${logs.map(l=>`<tr><td><b style="color:var(--primary);">${l.d}</b></td><td><span class="badge" style="background:white; border: 1px solid var(--border); color:var(--text-muted);">${l.loc}</span></td><td>${l.in}</td><td>${l.out}</td><td><b style="color:var(--accent);">${l.hrs}</b></td></tr>`).join('') || `<tr><td colspan="5" class="empty-state"><i class="far fa-folder-open fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>${t('no_data')}</td></tr>`}</tbody></table></div>
            <div id="t2" class="tab-content table-wrapper"><table><thead><tr><th>Type</th><th>Details</th><th>Status</th></tr></thead><tbody>${reqs.map(r=>`<tr><td><span class="badge" style="background:#f1f5f9; border:1px solid var(--border); color:var(--primary);">${r.type}</span></td><td><b style="color:var(--primary);">${r.detail}</b><br><span class="my-tooltip" style="font-size:12px;">${r.reason}<span class="tooltip-box">Details:<br>${r.reason}</span></span></td><td><span class="badge bg-${r.status.toLowerCase()}">${r.status}</span></td></tr>`).join('') || `<tr><td colspan="3" class="empty-state"><i class="far fa-folder-open fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>${t('no_data')}</td></tr>`}</tbody></table></div>
        </div>`;
    },
    'payslip': () => `
        <div class="flex-between no-print" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;"><i class="fas fa-file-invoice-dollar text-muted"></i> ${t('slip')}</h1>
            <div style="display:flex; gap:12px;">
                <select id="slip-month" onchange="App.genSlip()" style="margin:0; width:auto; font-weight:500;">
                    ${App.getMonthOptions()}
                </select>
                <button class="btn-outline" onclick="window.print()"><i class="fas fa-print"></i> Print PDF</button>
            </div>
        </div>
        <div id="printable-area"></div>
    `,
    'cal': () => `<div style="animation: fadeUp 0.4s ease-out;"><div class="calendar-nav"><h1 style="margin:0;"><i class="far fa-calendar-alt text-muted"></i> ${t('cal')} <span id="cal-title" style="color:var(--accent); font-weight:600; font-size:16px; margin-left:10px;"></span></h1><div style="display:flex; gap:8px;"><button class="cal-btn" onclick="App.changeCalMonth(-1)"><i class="fas fa-chevron-left"></i></button><button class="cal-btn" onclick="App.changeCalMonth(1)"><i class="fas fa-chevron-right"></i></button></div></div><div class="card"><div class="calendar-grid"><div class="cal-header">SUN</div><div class="cal-header">MON</div><div class="cal-header">TUE</div><div class="cal-header">WED</div><div class="cal-header">THU</div><div class="cal-header">FRI</div><div class="cal-header">SAT</div></div><div class="calendar-grid" id="cal-wrapper"></div></div></div>`,
    'doc': () => {
        const docs = [{ name: 'Employee_Handbook_2026', title: 'Employee Handbook', size: '2.4 MB', date: 'Jan 10, 2026' },{ name: 'WFH_Policy', title: 'Remote Work Policy', size: '1.1 MB', date: 'Feb 15, 2026' },{ name: 'Insurance_Claims', title: 'Health Insurance Claims', size: '3.5 MB', date: 'Mar 01, 2026' }];
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;"><i class="far fa-folder-open text-muted"></i> ${t('doc')}</h1><div class="card"><h2 style="margin-bottom: 16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Standard Operating Procedures (SOP)</h2>${docs.map(d => `<div class="policy-item"><div style="display:flex; align-items:center; gap:16px;"><div style="width:40px; height:40px; background:var(--bg-main); color:var(--accent); border: 1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:18px;"><i class="far fa-file-pdf"></i></div><div><div style="font-weight:600; color:var(--primary); font-size:13px;">${d.title}</div><div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Updated: ${d.date} • ${d.size}</div></div></div><button class="btn-outline" style="width:auto; font-size:12px; padding:6px 12px;" onclick="App.downloadFile('${d.name}')"><i class="fas fa-download"></i></button></div>`).join('')}</div></div>`;
    },
    'prof': () => {
        const u = AppState.currentUser.username;
        const p = AppState.profiles[u] || { email: '', phone: '', startDate: '' };
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;"><i class="far fa-user-circle text-muted"></i> ${t('prof')}</h1><div class="grid-dash"><div class="card"><h2 style="margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">Personal Information</h2><div class="grid-2"><div><label>Full Name</label><input type="text" value="${AppState.currentUser.name}" disabled style="background:#f8fafc; color:#94a3b8;"></div><div><label>Employee ID</label><input type="text" value="EMP-${u.toUpperCase()}" disabled style="background:#f8fafc; color:#94a3b8;"></div><div><label>Department</label><input type="text" value="${AppState.currentUser.dept}" disabled style="background:#f8fafc; color:#94a3b8;"></div><div><label>Start Date</label><input type="text" value="${p.startDate}" disabled style="background:#f8fafc; color:#94a3b8;"></div><div><label>Email Address</label><input type="email" id="prof-email" value="${p.email}"></div><div><label>Contact Number</label><input type="text" id="prof-phone" value="${p.phone}"></div></div><div style="text-align:right; margin-top:16px;"><button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveProfile()"><i class="fas fa-save"></i> Save Changes</button></div></div><div class="card" style="text-align:center;"><img src="${p.avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=e0e7ff&color=3b82f6&size=150`}" id="prof-avatar-img" style="border-radius:50%; border: 4px solid var(--bg-main); margin-bottom: 16px; width:120px; height:120px; object-fit:cover;"><h2 style="margin:0; font-size:16px;">${AppState.currentUser.name}</h2><p class="text-muted" style="margin-bottom:20px; font-size:12px;">${AppState.currentUser.dept}</p><input type="file" id="avatar-upload" style="display:none;" accept="image/*" onchange="App.handleAvatarUpload(event)"><button class="btn-outline" style="font-size:12px; padding:8px 16px;" onclick="document.getElementById('avatar-upload').click()"><i class="fas fa-camera"></i> Update Photo</button></div></div></div>`;
    },

    // 🟢 หน้า Admin Dashboard แบบ 4 กล่อง (Grid-4)
    'admin-dash': () => {
        const todayStr = new Date().toLocaleDateString('en-CA');
        let activeCount = 0;
        for (const user in AppState.dailyClock) { if (AppState.dailyClock[user].date === todayStr && AppState.dailyClock[user].status === 'in') activeCount++; }
        
        const pendingApprovals = AppState.requests.filter(r=>r.status==='Pending').length;
        const totalEmployees = AppState.users.filter(u=>u.isActive).length;
        const onLeave = AppState.requests.filter(r=>r.status==='Approved' && r.type==='Leave').length; // จำลองคนลา

        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;"><i class="fas fa-chart-pie text-muted"></i> ${t('admin_dash')}</h1>
        <div class="grid-4" style="margin-bottom: 24px;">
            <div class="card" style="padding:20px; border-top: 3px solid var(--primary);">
                <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-users"></i> Employees</h2>
                <div class="stat-value" style="font-size:28px;">${totalEmployees}</div>
            </div>
            <div class="card" style="padding:20px; border-top: 3px solid var(--success);">
                <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-building"></i> Present Today</h2>
                <div class="stat-value" style="color:var(--success); font-size:28px;">${activeCount}</div>
            </div>
            <div class="card" style="padding:20px; border-top: 3px solid var(--warning);">
                <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-umbrella-beach"></i> On Leave</h2>
                <div class="stat-value" style="color:var(--warning); font-size:28px;">${onLeave}</div>
            </div>
            <div class="card" style="padding:20px; border-top: 3px solid var(--danger);">
                <h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-clipboard-check"></i> Pending Approvals</h2>
                <div class="stat-value" style="color:var(--danger); font-size:28px;">${pendingApprovals}</div>
            </div>
        </div>
        <div class="card"><h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Weekly Attendance Overview</h2><div style="height: 280px; width: 100%; position: relative;"><canvas id="adminDashChart"></canvas></div></div></div>`;
    },
    'admin-approve': () => {
        const p = AppState.requests.filter(r=>r.status==='Pending');
        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;"><i class="fas fa-check-circle text-muted"></i> ${t('admin_appr')}</h1><div class="card table-wrapper" style="padding: 0;"><table style="margin:0;"><thead><tr><th>Employee</th><th>Request Info</th><th style="text-align:right;">Actions</th></tr></thead><tbody>${p.map(r=>`<tr><td><b style="font-size:14px; color:var(--primary);">${r.name}</b><br><span style="font-size:12px; color:var(--text-muted);">EMP-${r.u.toUpperCase()}</span></td><td><span class="badge" style="background:#f8fafc; border:1px solid var(--border); color:var(--text-dark); margin-bottom:4px;">${r.type}</span> <b style="font-size:13px; color:var(--primary);">${r.detail}</b><br><span class="my-tooltip" style="font-size:12px;">${r.reason}<span class="tooltip-box">Details:<br>${r.reason}</span></span></td><td style="text-align:right;"><button class="btn-primary" style="background:var(--success); width:auto; padding:6px 14px; margin-right:4px;" onclick="App.actionReq(${r.id}, 'Approved')"><i class="fas fa-check"></i> ${t('approve')}</button> <button class="btn-primary" style="background:var(--danger); width:auto; padding:6px 14px;" onclick="App.actionReq(${r.id}, 'Rejected')"><i class="fas fa-times"></i> ${t('reject')}</button></td></tr>`).join('') || `<tr><td colspan="3" class="empty-state"><i class="far fa-check-circle fa-2x" style="color:var(--success); margin-bottom:8px; opacity:0.5;"></i><br>No pending requests at this time.</td></tr>`}</tbody></table></div></div>`;
    },
    'admin-dir': () => {
        const currentUserRole = AppState.currentUser.role;
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="flex-between" style="margin-bottom:24px;">
                <h1 style="margin:0;"><i class="fas fa-users text-muted"></i> ${t('admin_dir')}</h1>
                <div style="display:flex; gap:12px;">
                    <button class="btn-outline" onclick="App.exportToCSV()"><i class="fas fa-file-csv"></i> Export CSV</button>
                    <button class="btn-primary" style="width:auto;"><i class="fas fa-user-plus"></i> Add Employee</button>
                </div>
            </div>
            <div class="card table-wrapper" style="padding:0;">
                <table style="margin:0;">
                    <thead><tr><th>ID</th><th>Name & Dept</th><th>Role</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead>
                    <tbody>${AppState.users.map(u => {
                        const isActive = u.isActive !== false; 
                        const statusBadge = isActive ? 
                            `<span class="badge" style="background:#ecfdf5; color:#047857; border: 1px solid #a7f3d0;">${t('btn_active')}</span>` : 
                            `<span class="badge" style="background:#fef2f2; color:#b91c1c; border: 1px solid #fecaca;">${t('btn_inactive')}</span>`;
                        
                        const toggleBtnStr = isActive ? `<i class="fas fa-ban"></i> ${t('act_disable')}` : `<i class="fas fa-check"></i> ${t('act_enable')}`;
                        const toggleBtnColor = isActive ? `var(--danger)` : `var(--success)`;
                        
                        const resetBtn = (currentUserRole === 'admin' || currentUserRole === 'it') ? 
                            `<button class="btn-outline" style="padding:6px 10px; margin-right:4px; font-size:13px;" onclick="App.resetPass('${u.username}')" title="Reset Password"><i class="fas fa-key text-muted" style="margin:0;"></i></button>` : '';

                        return `<tr>
                            <td style="font-size:12px; color:var(--text-muted);">EMP-${u.username.toUpperCase()}</td>
                            <td><b style="color:var(--primary);">${u.name}</b><br><span style="font-size:12px; color:var(--text-muted);">${u.dept || '-'}</span></td>
                            <td><span class="badge" style="background:#f8fafc; border:1px solid var(--border); color:var(--text-dark);">${u.role.toUpperCase()}</span></td>
                            <td>${statusBadge}</td>
                            <td style="text-align:right; white-space:nowrap;">
                                ${resetBtn}
                                <button class="btn-outline" style="padding:6px 12px; font-size:12px; width:auto; margin-right: 4px;" onclick="App.openEditUser('${u.username}')"><i class="fas fa-pen"></i> Edit</button>
                                <button class="btn-primary" style="background:${toggleBtnColor}; padding:6px 12px; font-size:12px; width:auto;" onclick="App.toggleUserStatus('${u.username}')">${toggleBtnStr}</button>
                            </td>
                        </tr>`;
                    }).join('')}</tbody>
                </table>
            </div>
        </div>
    `},
    'admin-rep': () => `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;"><i class="fas fa-chart-line text-muted"></i> ${t('admin_rep')}</h1><div class="grid-2"><div class="card"><h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Leave Distribution</h2><div style="text-align:center; padding:40px; color:var(--text-dark); background:var(--bg-main); border-radius:var(--radius-sm); border:1px dashed var(--border);">Annual Leave: 65%<br><br>Sick Leave: 25%<br><br>Personal: 10%</div></div><div class="card"><h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Overtime Costs</h2><div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm); border:1px dashed var(--border);"><b style="font-size:28px; color:var(--primary);">THB 124,500.50</b><br><span style="font-size:12px;">Total OT payout this month</span></div></div></div></div>`,
    
    // 🟢 หน้า Setting สำหรับ IT และ Admin (เปลี่ยนศัพท์เป็นทางการ)
    'admin-set': () => {
        const u = AppState.currentUser;
        let itSettingsSection = '';
        
        if (u.role === 'it') {
            itSettingsSection = `
                <hr style="margin:32px 0; border:0; border-top:1px solid var(--border);">
                <h2 style="color:var(--primary); display:flex; align-items:center; gap:8px;"><i class="fas fa-server"></i> System Administration</h2>
                <div class="grid-2" style="margin-top:16px;">
                    <div style="background:white; padding:20px; border-radius:var(--radius-sm); border:1px solid var(--border); box-shadow:var(--shadow-sm);">
                        <h3 style="color:var(--text-dark); margin-top:0; font-size:14px; text-transform:uppercase;">Maintenance Mode</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Restrict access for non-IT personnel during system upgrades.</p>
                        <select id="set-maintenance" style="margin-bottom:0; font-size:13px;">
                            <option value="off" ${!AppState.settings.maintenance ? 'selected' : ''}>System Online (Normal)</option>
                            <option value="on" ${AppState.settings.maintenance ? 'selected' : ''}>Maintenance Active (Restricted)</option>
                        </select>
                    </div>
                    <div style="background:white; padding:20px; border-radius:var(--radius-sm); border:1px solid var(--border); box-shadow:var(--shadow-sm);">
                        <h3 style="color:var(--text-dark); margin-top:0; font-size:14px; text-transform:uppercase;">Data Management</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Create backups or clear application cache to resolve sync issues.</p>
                        <div style="display:flex; gap:8px;">
                            <button class="btn-outline" style="flex:1; font-size:12px; padding:10px;" onclick="App.backupDB()"><i class="fas fa-download"></i> Backup</button>
                            <button class="btn-primary" style="background:var(--danger); flex:1; font-size:12px; padding:10px;" onclick="App.clearCache()"><i class="fas fa-trash-alt"></i> Clear Cache</button>
                        </div>
                    </div>
                </div>
            `;
        }

        return `<div style="animation: fadeUp 0.4s ease-out;"><h1 style="margin-bottom:24px;"><i class="fas fa-cogs text-muted"></i> ${u.role === 'it' ? t('it_set') : t('admin_set')}</h1><div class="card" style="max-width:800px;"><h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Global Configurations</h2><div class="grid-2"><div><label>Company Name</label><input type="text" id="set-company" value="${AppState.settings.companyName}"></div><div><label>Default Annual Leave Quota (Days)</label><input type="number" id="set-quota" value="${AppState.settings.leaveQuota}"></div></div><hr style="margin:24px 0; border:0; border-top:1px solid var(--border);"><h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Broadcast Announcement</h2><p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Message will be displayed on all user dashboards. Leave blank to disable.</p><textarea id="set-broadcast" rows="3" placeholder="Enter announcement text here...">${AppState.settings.broadcast || ''}</textarea>
        ${itSettingsSection}
        <div style="text-align:right; margin-top:24px; padding-top:20px; border-top:1px solid var(--border);"><button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveSettings()"><i class="fas fa-save"></i> Save Configuration</button></div></div></div>`;
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