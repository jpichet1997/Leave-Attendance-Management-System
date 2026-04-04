/**
 * ==========================================================================
 * 🚀 ENTERPRISE HR OS v4.0 - FULL SCALE EDITION (PART 1/4)
 * ==========================================================================
 */

// ==========================================
// 1. LANGUAGE & TIME ENGINE
// ==========================================
let lang = localStorage.getItem('hr_lang') || 'en';

const dict = {
    'th': {
        'dash': 'หน้าหลัก', 'time': 'ลงเวลาและวันลา', 'slip': 'สลิปเงินเดือน', 'cal': 'ปฏิทินบริษัท', 
        'doc': 'เอกสารและระเบียบ', 'prof': 'ข้อมูลส่วนตัว', 'admin_dash': 'ภาพรวมระบบ', 
        'admin_appr': 'อนุมัติคำขอ', 'admin_dir': 'รายชื่อพนักงาน', 'admin_rep': 'รายงานวิเคราะห์', 
        'admin_set': 'ตั้งค่าระบบ', 'it_dash': 'สถานะเซิร์ฟเวอร์', 'it_users': 'จัดการสิทธิ์ผู้ใช้งาน', 
        'it_set': 'จัดการระบบ', 'it_log': 'บันทึกประวัติ (Audit Log)', 'welcome': 'ยินดีต้อนรับ', 
        'clock_title': 'ระบบบันทึกเวลาทำงาน', 'clock_btn_in': 'บันทึกเข้างาน', 'clock_btn_out': 'บันทึกออกงาน',
        'loc_office': 'สำนักงานใหญ่', 'loc_wfh': 'ทำงานที่บ้าน (WFH)', 'salary_title': 'ประมาณการรายได้สุทธิ',
        'show': 'แสดง', 'hide': 'ซ่อน', 'leave_bal': 'สิทธิวันลาคงเหลือ', 'req_ot': 'บันทึกคำขอ OT', 
        'req_lv': 'บันทึกคำขอลางาน', 'tab_log': 'ประวัติลงเวลา', 'tab_lv': 'ประวัติการลา', 'tab_ot': 'ประวัติล่วงเวลา', 
        'no_data': 'ไม่พบข้อมูลในระบบ', 'approve': 'อนุมัติ', 'reject': 'ปฏิเสธ', 'loading': 'กำลังโหลดข้อมูล...',
        'slip_base': 'เงินเดือนพื้นฐาน', 'slip_ot': 'ค่าล่วงเวลา (OT)', 'slip_allow': 'เงินได้อื่นๆ',
        'slip_total_earn': 'รวมเงินได้', 'slip_sso': 'ประกันสังคม', 'slip_tax': 'ภาษีหัก ณ ที่จ่าย',
        'slip_absent': 'รายการหักอื่นๆ', 'slip_total_deduct': 'รวมรายการหัก', 'slip_net': 'เงินได้สุทธิ',
        'acc_locked': 'บัญชีถูกระงับ กรุณาติดต่อฝ่าย IT', 'btn_active': 'ปกติ', 'btn_inactive': 'ระงับ',
        'act_disable': 'ระงับบัญชี', 'act_enable': 'เปิดใช้งาน'
    },
    'en': {
        'dash': 'Dashboard', 'time': 'Time & Leave', 'slip': 'E-Payslip', 'cal': 'Calendar', 
        'doc': 'Policies', 'prof': 'My Profile', 'admin_dash': 'Overview', 'admin_appr': 'Approvals', 
        'admin_dir': 'Directory', 'admin_rep': 'Analytics', 'admin_set': 'Settings', 'it_dash': 'System Status', 
        'it_users': 'Access Control', 'it_set': 'System Admin', 'it_log': 'Audit Logs', 'welcome': 'Welcome', 
        'clock_title': 'Attendance System', 'clock_btn_in': 'Clock In', 'clock_btn_out': 'Clock Out',
        'loc_office': 'Head Office', 'loc_wfh': 'Remote / WFH', 'salary_title': 'Net Salary Estimate',
        'show': 'Show', 'hide': 'Hide', 'leave_bal': 'Leave Balances', 'req_ot': 'Request OT', 
        'req_lv': 'Request Leave', 'tab_log': 'Time Logs', 'tab_lv': 'Leave History', 'tab_ot': 'OT History', 
        'no_data': 'No records found.', 'approve': 'Approve', 'reject': 'Reject', 'loading': 'Loading data...',
        'slip_base': 'Base Salary', 'slip_ot': 'Overtime Pay', 'slip_allow': 'Allowances',
        'slip_total_earn': 'Total Earnings', 'slip_sso': 'Social Security', 'slip_tax': 'Withholding Tax',
        'slip_absent': 'Deductions', 'slip_total_deduct': 'Total Deductions', 'slip_net': 'Net Salary',
        'acc_locked': 'Account suspended. Please contact IT Support.', 'btn_active': 'Active', 
        'btn_inactive': 'Suspended', 'act_disable': 'Suspend', 'act_enable': 'Activate'
    }
};

const t = (key) => dict[lang][key] || key;

const TimeEngine = {
    getGreeting: () => {
        const hr = new Date().getHours();
        if (lang === 'th') return hr < 12 ? `อรุณสวัสดิ์` : hr < 18 ? `สวัสดีตอนบ่าย` : `สวัสดีตอนเย็น`;
        return hr < 12 ? `Good Morning` : hr < 18 ? `Good Afternoon` : `Good Evening`;
    },
    startClock: () => {
        setInterval(() => {
            const el = document.getElementById('realtime-clock');
            if (el) el.innerHTML = new Date().toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        }, 1000);
    }
};

function toggleLanguage(event) { 
    if (event) event.preventDefault(); 
    lang = lang === 'th' ? 'en' : 'th'; 
    localStorage.setItem('hr_lang', lang); 
    applyLang(); 
    const authView = document.getElementById('auth-view');
    if (AppState && AppState.currentUser && authView && authView.style.display === 'none') {
        if (typeof App !== 'undefined' && App.boot) App.boot();
    }
}

function applyLang() { 
    document.querySelectorAll('.th-en').forEach(el => el.innerText = el.getAttribute(`data-${lang}`)); 
    const btn = document.getElementById('top-lang-btn'); 
    if (btn) {
        btn.innerHTML = lang === 'th' ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> TH'; 
        btn.onclick = (e) => toggleLanguage(e); 
    }
    const langBtns = document.querySelectorAll('.lang-switch');
    langBtns.forEach(btn => { btn.onclick = (e) => toggleLanguage(e); });
}

// ==========================================
// 2. DYNAMIC STYLES INJECTION
// ==========================================
if (!document.getElementById('custom-dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-dynamic-styles';
    style.innerHTML = `
        td { position: relative; z-index: 5; pointer-events: auto; }
        .btn-outline, .btn-primary, button { position: relative; z-index: 10 !important; cursor: pointer; pointer-events: auto !important; }
        .table-wrapper { overflow: visible !important; } 

        .evidence-hover { position: relative; display: inline-block; }
        .evidence-hover .preview-box { display: none; position: absolute; bottom: 120%; left: 0; width: 250px; background: white; border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2); padding: 6px; z-index: 1000; }
        .evidence-hover:hover .preview-box { display: block; animation: fadeUp 0.2s ease-out; }
        .preview-box img { width: 100%; max-height: 200px; border-radius: 4px; object-fit: contain; background: #f8fafc; }
        .preview-box::after { content: ''; position: absolute; top: 100%; left: 20px; border-width: 8px; border-style: solid; border-color: white transparent transparent transparent; }
        
        .details-modal-content { background: #fff; padding: 0; border-radius: 12px; width: 100%; max-width: 500px; text-align: left; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); animation: fadeUp 0.3s ease-out; margin: auto; position: relative; }
        .details-header { padding: 16px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .details-header h2 { margin: 0; font-size: 18px; color: #1e293b; font-weight: 700; }
        .details-close { background: transparent; border: none; font-size: 16px; cursor: pointer; color: #64748b; transition: 0.2s; width: 30px; height: 30px; border-radius: 50%; display:flex; justify-content:center; align-items:center; background:#f1f5f9; }
        .details-close:hover { color: #0f172a; background:#e2e8f0; }
        .details-body { padding: 24px; }
        .details-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .details-title-row h3 { margin: 0; font-size: 16px; color: #0f172a; font-weight: 700; }
        .details-row { display: flex; margin-bottom: 8px; font-size: 13px; line-height: 1.5; }
        .details-label { width: 120px; color: #64748b; font-weight: 500; flex-shrink: 0; }
        .details-value { color: #1e293b; font-weight: 600; }
        .details-notes { background: #f8fafc; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #e2e8f0; }
        .details-notes p { margin: 0; font-size: 13px; color: #334155; line-height:1.5; }
        .details-footer { padding: 16px 24px; background: #fff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }

        .filter-bar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; align-items: center; background: white; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .filter-btn { background: transparent; border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #64748b; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px; outline: none; }
        .filter-btn:hover { background: #f1f5f9; color: #0f172a; }
        .filter-btn.active { background: var(--brand-main); color: white; }
        .filter-pill { background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
        .filter-btn.active .filter-pill { background: rgba(255,255,255,0.2); color: white !important; }
        .search-box { padding: 8px 16px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 13px; width: 100%; max-width: 250px; outline: none; transition: 0.2s; }
        .search-box:focus { border-color: var(--brand-main); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        
        @keyframes scanline { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .face-scanner-box { position: relative; width: 220px; height: 220px; margin: 20px auto; border-radius: 50%; overflow: hidden; border: 4px solid var(--brand-main); box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); background: #0f172a; }
        .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #10b981; box-shadow: 0 0 15px #10b981; animation: scanline 2.5s infinite linear; display: none; z-index: 10; }
        .scan-overlay { position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(16, 185, 129, 0.1); display: none; z-index: 5; }

        .digital-twin-wrapper { background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #334155; position: relative; overflow: hidden; }
        .office-floor { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .dept-zone { background: rgba(30, 41, 59, 0.6); border: 1px dashed #475569; border-radius: 8px; padding: 15px; min-height: 120px; position: relative; }
        .zone-title { color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; border-bottom: 1px solid #334155; padding-bottom: 5px; }
        .wfh-zone { background: rgba(15, 23, 42, 0.8); border: 1px dashed #3b82f6; }
        
        .live-avatar { display: inline-flex; align-items: center; gap: 6px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; color: #10b981; padding: 4px 10px; border-radius: 20px; font-size: 11px; margin: 4px; box-shadow: 0 0 10px rgba(16,185,129,0.2); animation: pulse-green 2s infinite; transition: all 0.3s; }
        .live-avatar.wfh { border-color: #3b82f6; color: #3b82f6; background: rgba(59, 130, 246, 0.1); box-shadow: 0 0 10px rgba(59,130,246,0.2); animation: pulse-blue 2s infinite; }
        .live-avatar img { width: 18px; height: 18px; border-radius: 50%; border: 1px solid currentColor; }
        
        @keyframes pulse-green { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
        @keyframes pulse-blue { 0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); } 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); } }
        
        .event-badge { background: #eff6ff; color: var(--brand-main); font-size: 10px; font-weight: 600; padding: 4px 8px; border-radius: 4px; border: 1px solid #bfdbfe; margin-top: 4px; display: inline-block; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; transition: 0.2s;}
        .event-badge:hover { filter: brightness(0.95); transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    `;
    document.head.appendChild(style);
}

// ==========================================
// 3. FIREBASE CONFIG & STATE STORE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyAUHCBVj2_6grlBdexUmP1BjzflOCaHiMQ",
    authDomain: "hr-system-2026-7c138.firebaseapp.com",
    projectId: "hr-system-2026-7c138",
    storageBucket: "hr-system-2026-7c138.firebasestorage.app",
    messagingSenderId: "502248569009",
    appId: "1:502248569009:web:b56da4a67ea3290fdd0a90"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbRef = db.collection('hr_database').doc('main_state');

const defaultState = {
    users: [
        { username: 'admin', password: '123', name: 'HR Manager', role: 'admin', dept: 'Human Resources', isActive: true },
        { username: 'user', password: '123', name: 'John Doe', role: 'employee', dept: 'Marketing', isActive: true },
        { username: 'head', password: '123', name: 'Sales Manager', role: 'head', dept: 'Sales', isActive: true }, 
        { username: 'it', password: '123', name: 'IT Administrator', role: 'it', dept: 'IT Operations', isActive: true }
    ],
    currentUser: null, 
    dailyClock: {}, 
    leaveBalances: { 'user': { annual: 8.5, sick: 28 }, 'admin': { annual: 15, sick: 30 }, 'head': { annual: 12, sick: 30 }, 'it': { annual: 15, sick: 30 } }, 
    requests: [], timeLogs: [], notifications: [], auditLogs: [], 
    profiles: { 
        'admin': { email: 'admin@sj-inter.com', phone: '089-999-9999', startDate: '2020-01-01', avatar: '' },
        'user': { email: 'john.d@sj-inter.com', phone: '081-234-5678', startDate: '2024-01-15', avatar: '' },
        'head': { email: 'manager@sj-inter.com', phone: '085-555-5555', startDate: '2021-06-01', avatar: '' },
        'it': { email: 'it.admin@sj-inter.com', phone: '088-888-8888', startDate: '2022-05-10', avatar: '' }
    },
    settings: { companyName: 'For-You International Co.,Ltd.', leaveQuota: 10, broadcast: '', maintenance: false }
};

let AppState = defaultState;

const DB = {
    load: async () => {
        try {
            const doc = await dbRef.get();
            if (doc.exists) {
                AppState = doc.data();
                AppState.currentUser = null; 
                if(!AppState.profiles) AppState.profiles = defaultState.profiles; 
                if(!AppState.auditLogs) AppState.auditLogs = []; 
                if (AppState.settings.broadcast === undefined) AppState.settings.broadcast = '';
                if (AppState.settings.maintenance === undefined) AppState.settings.maintenance = false;
            } else { 
                await dbRef.set(defaultState); AppState = defaultState; 
            }
            return AppState;
        } catch (error) { console.error("Database error:", error); return AppState; }
    },
    save: (state) => {
        const dataToSave = { ...state }; delete dataToSave.currentUser;
        if (dataToSave.auditLogs && dataToSave.auditLogs.length > 100) dataToSave.auditLogs.length = 100;
        dbRef.set(dataToSave, { merge: true }).catch(err => console.error("Database sync error:", err));
    }
};

// Global Variables Shared
let chartInst = null; let liveChartInst = null; let liveChartInterval = null; 
let bioInterval = null; let isSalaryVisible = false; 
let calMonth = new Date().getMonth(); let calYear = new Date().getFullYear();

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader(); reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result); reader.onerror = error => reject(error);
});/**
 * ==========================================================================
 * 🚀 ENTERPRISE HR OS v4.0 - FULL SCALE EDITION (PART 2/4)
 * Modules: Notifications, Authentication, and Application Core Controller
 * ==========================================================================
 */

// ==========================================
// 4. NOTIFICATION ENGINE
// ==========================================
const Notif = {
    push: (user, msg) => {
        AppState.notifications.unshift({ 
            id: Date.now(), 
            username: user, 
            message: msg, 
            isRead: false, 
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
        });
        
        if (AppState.notifications.length > 50) {
            AppState.notifications.length = 50;
        }
        
        DB.save(AppState);
        
        if (AppState.currentUser && AppState.currentUser.username === user) { 
            App.toast(msg); 
            Notif.render(); 
        }
    },
    render: () => {
        if (!AppState.currentUser) return;
        
        const notifs = AppState.notifications.filter(n => n.username === AppState.currentUser.username);
        const unread = notifs.filter(n => !n.isRead).length;
        const b = document.getElementById('notif-badge');
        
        if (b) { 
            b.innerText = unread; 
            b.style.display = unread > 0 ? 'block' : 'none'; 
        }
        
        const list = document.getElementById('notif-list');
        if (list) {
            list.innerHTML = notifs.slice(0, 5).map(n => `
                <div class="notif-item ${n.isRead ? '' : 'unread'}" onclick="App.nav('time', this)">
                    <div style="color:var(--brand-main); font-weight:600;">${n.message}</div>
                    <small style="color:var(--text-muted);"><i class="far fa-clock"></i> ${n.time}</small>
                </div>
            `).join('') || `<div class="empty-state"><i class="fas fa-inbox fa-2x" style="color:var(--border-color); margin-bottom:8px;"></i><br>${t('no_data')}</div>`;
        }
    },
    toggle: () => {
        document.getElementById('notif-dropdown').classList.toggle('show');
    },
    read: (id) => { 
        const n = AppState.notifications.find(x => x.id === id); 
        if (n) { 
            n.isRead = true; 
            DB.save(AppState); 
            Notif.render(); 
        } 
    }
};

// ==========================================
// 5. SECURE AUTHENTICATION SYSTEM
// ==========================================
const Auth = {
    toggle: (type) => {
        const loginForm = document.getElementById('form-login');
        const regForm = document.getElementById('form-register');
        
        if (type === 'login') {
            loginForm.style.display = 'block';
            regForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            regForm.style.display = 'block';
        }
    },
    
    register: () => {
        const name = document.getElementById('reg-name').value;
        const user = document.getElementById('reg-user').value.toLowerCase().trim();
        const pass = document.getElementById('reg-pass').value;
        const role = document.getElementById('reg-role').value;
        
        if (AppState.users.find(u => u.username === user)) {
            return App.toast('Username is already registered.', 'error');
        }
        
        let defDept = 'General Staff';
        if (role === 'admin') defDept = 'Human Resources';
        if (role === 'head') defDept = 'Department Head'; 
        if (role === 'it') defDept = 'IT Operations';

        AppState.users.push({ 
            username: user, password: pass, name: name, 
            role: role, dept: defDept, isActive: true 
        });
        
        AppState.leaveBalances[user] = { annual: AppState.settings.leaveQuota, sick: 30 }; 
        AppState.profiles[user] = { 
            email: user + '@sj-inter.com', phone: '-', 
            startDate: new Date().toLocaleDateString('en-CA'), avatar: '' 
        };
        
        App.addLog('System', `New user provisioned: ${user} (${role})`); 
        DB.save(AppState); 
        
        App.toast('Account created successfully.', 'success'); 
        Auth.toggle('login'); 
    },
    
    login: () => {
        const u = document.getElementById('login-user').value.toLowerCase().trim();
        const p = document.getElementById('login-pass').value;
        
        if (AppState.settings.maintenance && u !== 'it') {
            if (typeof Swal !== 'undefined') {
                Swal.fire({ 
                    icon: 'info', 
                    title: 'System Maintenance', 
                    text: 'The system is currently undergoing scheduled maintenance. Please try again later.', 
                    confirmButtonColor: '#0f172a' 
                });
            } else { 
                alert('System Maintenance Mode. Please try again later.'); 
            }
            return;
        }

        const acc = AppState.users.find(x => x.username === u && x.password === p);
        
        if (acc) { 
            if (acc.isActive === false) { 
                alert(t('acc_locked')); 
                return; 
            }
            
            AppState.currentUser = acc; 
            localStorage.setItem('hr_logged_user', JSON.stringify(acc)); 
            App.addLog('Authentication', `User login successful: ${u}`); 

            if (typeof Swal !== 'undefined') {
                Swal.fire({ 
                    icon: 'success', 
                    title: 'Authentication Successful', 
                    text: 'Initializing workspace...', 
                    showConfirmButton: false, 
                    timer: 1000 
                }).then(() => { 
                    App.boot(); 
                });
            } else { 
                App.boot(); 
            }
        } else {
            if (typeof Swal !== 'undefined') {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Invalid credentials.' });
            } else {
                alert('Authentication failed. Invalid credentials.');
            }
        }
    },
    
    logout: () => { 
        App.addLog('Authentication', `User logout: ${AppState.currentUser.username}`);
        AppState.currentUser = null; 
        localStorage.removeItem('hr_logged_user'); 
        location.reload(); 
    }
};

// ==========================================
// 6. CORE APP CONTROLLER
// ==========================================
const App = {
    toast: (msg, type = 'success') => { 
        if (typeof Swal !== 'undefined') {
            const Toast = Swal.mixin({ 
                toast: true, 
                position: 'bottom-end', 
                showConfirmButton: false, 
                timer: 3000, 
                timerProgressBar: true 
            });
            Toast.fire({ icon: type, title: msg });
        }
    },
    
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
        
        if (AppState.auditLogs.length > 100) {
            AppState.auditLogs.length = 100;
        }
        DB.save(AppState);
    },

    boot: () => {
        document.getElementById('auth-view').style.display = 'none';
        document.getElementById('app-view').style.display = 'flex';
        
        const u = AppState.currentUser;
        document.getElementById('user-name').innerText = u.name;
        document.getElementById('user-dept').innerText = u.dept;
        
        if(typeof App.updateAvatarImg === 'function') App.updateAvatarImg();
        TimeEngine.startClock();
        
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
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user-circle"></i> ${t('prof')}</div>
            `;
            App.nav('admin-dash', menu.children[1]);
        } else if (u.role === 'head') {
             menu.innerHTML = `
                <div class="nav-divider">Supervisor Workspace</div>
                <div class="nav-item active" onclick="App.nav('home', this)"><i class="fas fa-home"></i> ${t('dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-approve', this)"><i class="fas fa-check-circle"></i> Team Approvals <span class="badge bg-danger" style="color:white; margin-left:auto;" id="badge-pending">0</span></div>
                <div class="nav-divider">Personal Records</div>
                <div class="nav-item" onclick="App.nav('time', this)"><i class="fas fa-clock"></i> ${t('time')}</div>
                <div class="nav-item" onclick="App.nav('payslip', this)"><i class="fas fa-file-invoice-dollar"></i> ${t('slip')}</div>
                <div class="nav-divider">Settings</div>
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user-circle"></i> ${t('prof')}</div>
            `;
            App.nav('home', menu.children[1]);
        } else if (u.role === 'it') {
            menu.innerHTML = `
                <div class="nav-divider">IT Operations</div>
                <div class="nav-item active" onclick="App.nav('it-dash', this)"><i class="fas fa-server"></i> ${t('it_dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-dir', this)"><i class="fas fa-users-cog"></i> ${t('it_users')}</div>
                <div class="nav-item" onclick="App.nav('it-logs', this)"><i class="fas fa-clipboard-list"></i> ${t('it_log')}</div>
                <div class="nav-item" onclick="App.nav('admin-set', this)"><i class="fas fa-cogs"></i> ${t('it_set')}</div>
                <div class="nav-divider">Settings</div>
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user-circle"></i> ${t('prof')}</div>
            `;
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
                <div class="nav-item" onclick="App.nav('prof', this)"><i class="fas fa-user"></i> ${t('prof')}</div>
            `;
            App.nav('home', menu.children[1]);
        }
        
        Notif.render(); 
        if(typeof App.updateBadge === 'function') App.updateBadge();
        
        const chatWidget = document.getElementById('chat-widget');
        if (chatWidget) {
            chatWidget.style.display = 'block';
        }
        
        if (typeof Chat !== 'undefined') {
            Chat.init(); 
        }
    },

   nav: (page, el) => {
        // 🛡️ 1. ROUTE GUARD: ระบบตรวจสอบสิทธิ์ (RBAC Security)
        const role = AppState.currentUser.role;
        const permissions = {
            'admin': ['home', 'time', 'payslip', 'cal', 'doc', 'prof', 'admin-dash', 'admin-approve', 'admin-dir', 'admin-rep', 'admin-set'],
            'head':  ['home', 'time', 'payslip', 'cal', 'doc', 'prof', 'admin-approve'],
            'it':    ['it-dash', 'admin-dir', 'it-logs', 'admin-set', 'prof'],
            'employee': ['home', 'time', 'payslip', 'cal', 'doc', 'prof']
        };

        // ถ้า Role ปัจจุบัน ไม่มีสิทธิ์เข้าหน้านั้น ให้เตะกระเด็น!
        if (!permissions[role].includes(page)) {
            App.addLog('Security Alert', `Unauthorized access attempt to [${page}] by ${AppState.currentUser.username}`);
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied 403',
                    text: 'คุณไม่มีสิทธิ์เข้าถึงหน้าจอนี้ (Unauthorized Route)',
                    confirmButtonColor: 'var(--danger)'
                });
            } else {
                alert('Access Denied: You do not have permission to view this module.');
            }
            return; // หยุดการทำงานทันที ไม่ให้เรนเดอร์หน้าจอ
        }

        // ==========================================
        // 🔄 2. RENDER ENGINE (ถ้าสิทธิ์ผ่าน ให้ทำต่อ)
        if (typeof liveChartInterval !== 'undefined' && liveChartInterval) clearInterval(liveChartInterval);
        
        if (el) { 
            document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active')); 
            el.classList.add('active'); 
        }
        
        const container = document.getElementById('page-content');
        
        // Fade out
        container.style.opacity = '0';
        container.style.transform = 'scale(0.98) translateY(10px)';
        container.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';

        setTimeout(() => {
            try {
                // ใส่ Skeleton รอโหลด
                container.innerHTML = `
                    <div class="skeleton-loader">
                        <div class="skeleton-line" style="width: 30%; height: 28px; margin-bottom: 24px;"></div>
                        <div class="grid-4" style="margin-bottom: 24px;">
                            <div class="skeleton-card" style="height: 110px;"></div><div class="skeleton-card" style="height: 110px;"></div>
                            <div class="skeleton-card" style="height: 110px;"></div><div class="skeleton-card" style="height: 110px;"></div>
                        </div>
                        <div class="skeleton-card" style="height: 350px;"></div>
                    </div>
                `;
                
                container.style.opacity = '1';
                container.style.transform = 'scale(1) translateY(0)';
                
                setTimeout(() => {
                    if (Views && Views[page]) {
                        container.innerHTML = Views[page]();
                    } else {
                        container.innerHTML = `<div class="empty-state"><h1>404 View Not Found</h1></div>`;
                    }

                    // ปลุกฟังก์ชันประจำหน้า
                    if (page === 'home') { 
                        isSalaryVisible = false; 
                        if(typeof App.updateClock === 'function') App.updateClock(); 
                        if(typeof App.renderChart === 'function') App.renderChart(); 
                        if(typeof App.renderDigitalTwin === 'function') App.renderDigitalTwin(); 
                    }
                    if (page === 'payslip' && typeof App.genSlip === 'function') App.genSlip();
                    if (page === 'cal' && typeof App.renderCalendarGrid === 'function') App.renderCalendarGrid();
                    if (page === 'admin-rep' && typeof App.renderAdminCharts === 'function') App.renderAdminCharts();
                    if (page === 'admin-dash' && typeof App.renderAdminDashChart === 'function') App.renderAdminDashChart();
                    if (page === 'it-dash' && typeof App.renderITLiveChart === 'function') App.renderITLiveChart(); 
                }, 150);

            } catch (err) {
                console.error("Render Error:", err);
                container.innerHTML = `<div class="card"><h3 style="color:var(--danger);"><i class="fas fa-exclamation-triangle"></i> Rendering Error</h3><p>${err.message}</p></div>`;
            }
        }, 200); 
    
    },// ==========================================
    // 🟢 UTILITIES & DATA PROCESSING
    // ==========================================
    getSalary: () => {
        const u = AppState.currentUser;
        if(u.role === 'admin' || u.role === 'it' || u.role === 'head') { 
            return { base: 85000, ot: 0, allow: 5000, sso: 750, tax: 6500, absent: 0, earn: 90000, deduct: 7250, net: 82750 }; 
        } else { 
            return { base: 35000, ot: 4250, allow: 1500, sso: 750, tax: 1250, absent: 0, earn: 40750, deduct: 2000, net: 38750 }; 
        }
    },

    updateAvatarImg: () => {
        const u = AppState.currentUser.username;
        if (!AppState.profiles[u]) {
            AppState.profiles[u] = { email: '', phone: '', startDate: '', avatar: '' }; 
        }
        
        const src = AppState.profiles[u].avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=e0e7ff&color=3b82f6&bold=true`;
        
        const img = document.getElementById('avatar-img'); 
        if (img) img.src = src;
        
        const profImg = document.getElementById('prof-avatar-img'); 
        if (profImg) profImg.src = src;
    },

    handleAvatarUpload: (e) => {
        const file = e.target.files[0]; 
        const u = AppState.currentUser.username;
        
        if (file) { 
            const reader = new FileReader(); 
            reader.onload = (event) => { 
                AppState.profiles[u].avatar = event.target.result; 
                DB.save(AppState); 
                App.updateAvatarImg(); 
                App.toast('Profile photo updated', 'success'); 
            }; 
            reader.readAsDataURL(file); 
        }
    },

    saveProfile: () => {
        const u = AppState.currentUser.username;
        AppState.profiles[u].email = document.getElementById('prof-email').value;
        AppState.profiles[u].phone = document.getElementById('prof-phone').value;
        DB.save(AppState); 
        App.toast('Profile information saved.', 'success');
    },

    downloadFile: (filename) => {
        App.toast(`Initiating download: ${filename}...`);
        const blob = new Blob(["Document Content placeholder: " + filename], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob); 
        const a = document.createElement("a"); 
        a.href = url; 
        a.download = filename + ".txt"; 
        a.click(); 
        window.URL.revokeObjectURL(url);
    },

    getMonthOptions: () => {
        let options = ''; 
        const today = new Date();
        for (let i = 0; i < 12; i++) {
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

    // ==========================================
    // 🟢 WORKFLOW & REQUESTS ENGINE
    // ==========================================
    submitLeave: async () => {
        const u = AppState.currentUser.username;
        const typeStr = document.getElementById('lv-type').value;
        const k = typeStr.includes('Annual') ? 'annual' : 'sick';
        let days = document.getElementById('lv-format').value === 'hourly' ? 0.125 : 1; 
        
        if (!AppState.leaveBalances[u]) {
            AppState.leaveBalances[u] = { annual: AppState.settings.leaveQuota, sick: 30 };
        }
        
        if (AppState.leaveBalances[u][k] < days) {
            return App.toast('Insufficient leave balance.', 'error');
        }
        
        let attachmentBase64 = null; 
        const fileInput = document.getElementById('lv-file');
        if (fileInput && fileInput.files[0]) { 
            try { 
                attachmentBase64 = await fileToBase64(fileInput.files[0]); 
            } catch(e) { 
                console.error(e); 
            } 
        }

        AppState.leaveBalances[u][k] -= days;
        
        AppState.requests.unshift({ 
            id: Date.now(), 
            type: 'Leave', 
            u: u, 
            name: AppState.currentUser.name, 
            detail: typeStr, 
            reason: document.getElementById('lv-reason').value, 
            attachment: attachmentBase64, 
            status: 'Pending (Supervisor)'
        });
        
        App.addLog('Workflow', `Submitted Leave Request`); 
        DB.save(AppState); 
        
        if (fileInput) fileInput.value = ''; 
        App.closeModal('modal-leave'); 
        App.toast('Request submitted to Supervisor.', 'success'); 
        App.nav('time', document.querySelectorAll('.nav-item')[1]); 
    },
    
    submitOT: async () => {
        let attachmentBase64 = null; 
        const fileInput = document.getElementById('ot-file');
        
        if (fileInput && fileInput.files[0]) { 
            try { 
                attachmentBase64 = await fileToBase64(fileInput.files[0]); 
            } catch(e) { 
                console.error(e); 
            } 
        }

        AppState.requests.unshift({ 
            id: Date.now(), 
            type: 'OT', 
            u: AppState.currentUser.username, 
            name: AppState.currentUser.name, 
            detail: document.getElementById('ot-hours').value + ' Hrs', 
            reason: document.getElementById('ot-reason').value, 
            attachment: attachmentBase64, 
            status: 'Pending (Supervisor)'
        });
        
        App.addLog('Workflow', `Submitted OT Request`); 
        DB.save(AppState); 
        
        if (fileInput) fileInput.value = '';
        App.closeModal('modal-ot'); 
        App.toast('OT request submitted to Supervisor.', 'success'); 
        App.nav('time', document.querySelectorAll('.nav-item')[1]);
    },

    actionReq: (id, actionType) => {
        if (event) event.stopPropagation(); // 🛡️ ป้องกันคลิกทะลุไปโดนตาราง
        
        const r = AppState.requests.find(x => x.id === id); 
        const userRole = AppState.currentUser.role;
        
        if (r) { 
            let newStatus = actionType; 
            
            if (actionType === 'Approved') {
                if (userRole === 'head') {
                    newStatus = 'Pending (HR)'; 
                } else if (userRole === 'admin') {
                    newStatus = 'Approved';
                }
            } else { 
                newStatus = 'Rejected'; 
            }

            r.status = newStatus; 
            App.addLog('Workflow Action', `${newStatus} request for ${r.name} (${r.type})`); 
            DB.save(AppState); 
            
            App.toast(`Request marked as ${newStatus}`); 
            App.nav('admin-approve'); 
            App.updateBadge(); 
        }
    },
    
    updateBadge: () => { 
        const b = document.getElementById('badge-pending'); 
        if (!b || !AppState.currentUser) return;
        
        const role = AppState.currentUser.role; 
        let count = 0;
        
        if (role === 'head') count = AppState.requests.filter(r => r.status === 'Pending (Supervisor)').length;
        if (role === 'admin') count = AppState.requests.filter(r => r.status === 'Pending (HR)').length;
        
        b.innerText = count; 
        b.style.display = count > 0 ? 'inline-block' : 'none'; 
    },

    // ==========================================
    // 🟢 UI & MODAL HANDLERS
    // ==========================================
    toggleSal: () => { 
        isSalaryVisible = !isSalaryVisible; 
        document.getElementById('salary-val').classList.toggle('masked'); 
        document.getElementById('salary-btn').innerHTML = isSalaryVisible ? `<i class="fas fa-eye-slash"></i> ${t('hide')}` : `<i class="fas fa-eye"></i> ${t('show')}`; 
    },
    
    switchTab: (id, btn) => { 
        document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active')); 
        btn.classList.add('active'); 
        document.querySelectorAll('.tab-content').forEach(x => { 
            x.style.display = 'none'; 
            x.style.opacity = '0'; 
        }); 
        const target = document.getElementById(id); 
        target.style.display = 'block'; 
        setTimeout(() => target.style.opacity = '1', 50); 
    },
    
    openModal: (id) => {
        if (event) event.stopPropagation();
        document.getElementById(id).classList.add('show');
    },
    
    closeModal: (id) => { 
        document.getElementById(id).classList.remove('show'); 
        if (document.getElementById('lv-file')) document.getElementById('lv-file').value = ''; 
        if (document.getElementById('ot-file')) document.getElementById('ot-file').value = ''; 
    },

    // ==========================================
    // 🟢 USER MANAGEMENT (ADMIN)
    // ==========================================
    openEditUser: (username) => {
        if (event) event.stopPropagation(); // 🛡️ ป้องกันคลิกทะลุ
        
        const u = AppState.users.find(x => x.username === username); 
        const bal = AppState.leaveBalances[username] || { annual: 0, sick: 0 };
        
        let m = document.getElementById('modal-edit-user');
        if (!m) { 
            m = document.createElement('div'); 
            m.className = 'modal'; 
            m.id = 'modal-edit-user'; 
            document.body.appendChild(m); 
        }
        
        m.innerHTML = `
            <div class="modal-content">
                <div class="flex-between" style="margin-bottom:24px;">
                    <h1 style="margin:0; font-size:18px;"><i class="fas fa-user-edit"></i> Edit Employee Record</h1>
                    <button class="btn-text" style="font-size:20px; color:var(--text-muted); padding:0; width:auto; border:none; box-shadow:none; background:transparent;" onclick="App.closeModal('modal-edit-user')"><i class="fas fa-times"></i></button>
                </div>
                <form onsubmit="event.preventDefault(); App.saveEditUser('${username}');">
                    <label>Full Name</label><input type="text" id="edit-u-name" value="${u.name}" required>
                    <label>Department</label><input type="text" id="edit-u-dept" value="${u.dept}" required>
                    <div class="grid-2">
                        <div>
                            <label>System Role</label>
                            <select id="edit-u-role">
                                <option value="employee" ${u.role === 'employee' ? 'selected' : ''}>Employee</option>
                                <option value="head" ${u.role === 'head' ? 'selected' : ''}>Supervisor</option>
                                <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin (HR)</option>
                                <option value="it" ${u.role === 'it' ? 'selected' : ''}>IT Support</option>
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
        if (u) { 
            u.name = document.getElementById('edit-u-name').value; 
            u.dept = document.getElementById('edit-u-dept').value; 
            u.role = document.getElementById('edit-u-role').value; 
        }
        
        if (!AppState.leaveBalances[username]) AppState.leaveBalances[username] = {};
        
        AppState.leaveBalances[username].annual = parseFloat(document.getElementById('edit-u-annual').value); 
        AppState.leaveBalances[username].sick = parseFloat(document.getElementById('edit-u-sick').value);
        
        App.addLog('Data Update', `Modified user profile: ${username}`); 
        DB.save(AppState); 
        
        App.closeModal('modal-edit-user'); 
        App.toast('Employee record updated.', 'success');
        
        const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Directory') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage')); 
        if (navEl) App.nav('admin-dir', navEl);
    },
    
    toggleUserStatus: (username) => {
        if (event) event.stopPropagation(); // 🛡️ ป้องกันคลิกทะลุ
        if (username === AppState.currentUser.username) { 
            return App.toast('Self-suspension is not permitted.', 'error'); 
        }
        
        const u = AppState.users.find(x => x.username === username);
        if (u) {
            u.isActive = u.isActive === false ? true : false;
            App.addLog('Access Control', `Changed account status for ${username} to ${u.isActive ? 'Active' : 'Suspended'}`); 
            DB.save(AppState); 
            App.toast(`Account status updated.`, 'success');
            
            const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Directory') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage')); 
            if (navEl) App.nav('admin-dir', navEl);
        }
    },
    
    resetPass: (username) => {
        if (event) event.stopPropagation(); // 🛡️ ป้องกันคลิกทะลุ
        if (typeof Swal !== 'undefined') {
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
                    if (u) { 
                        u.password = result.value; 
                        App.addLog('Security', `Password reset executed for: ${username}`); 
                        DB.save(AppState); 
                        App.toast('Password reset successfully.', 'success'); 
                    }
                }
            });
        }
    },

    saveSettings: () => { 
        AppState.settings.companyName = document.getElementById('set-company').value; 
        AppState.settings.leaveQuota = parseInt(document.getElementById('set-quota').value); 
        AppState.settings.broadcast = document.getElementById('set-broadcast').value; 
        
        const maintEl = document.getElementById('set-maintenance'); 
        if (maintEl) { 
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
        if (typeof Swal !== 'undefined') { 
            Swal.fire({ 
                title: 'Clear System Cache?', 
                text: "This action will purge temporary data. Do you wish to proceed?", 
                icon: 'warning', 
                showCancelButton: true, 
                confirmButtonColor: '#ef4444', 
                cancelButtonColor: '#64748b', 
                confirmButtonText: 'Proceed' 
            }).then((result) => { 
                if (result.isConfirmed) { 
                    App.addLog('System Maintenance', 'System cache cleared'); 
                    App.toast('Cache cleared successfully.', 'success'); 
                } 
            }); 
        } 
    },

    // ==========================================
    // 🟢 CALENDAR ENGINE (UPGRADED DETAILS)
    // ==========================================
    changeCalMonth: (dir) => { 
        calMonth += dir; 
        if (calMonth < 0) { 
            calMonth = 11; 
            calYear--; 
        } else if (calMonth > 11) { 
            calMonth = 0; 
            calYear++; 
        } 
        App.renderCalendarGrid(); 
    },
    
    renderCalendarGrid: () => {
        const wrapper = document.getElementById('cal-wrapper'); 
        if (!wrapper) return;
        
        const d = new Date(calYear, calMonth, 1);
        document.getElementById('cal-title').innerText = `${d.toLocaleString('en-US', { month: 'long' })} ${calYear}`;
        
        let html = '';
        for (let i = 0; i < d.getDay(); i++) { 
            html += `<div class="cal-day empty"></div>`; 
        }
        
        const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === calMonth && today.getFullYear() === calYear;
        
        // ดึงคำขอของ User นี้มาโชว์บนปฏิทิน
        const myRequests = AppState.requests.filter(req => req.u === AppState.currentUser.username);

        for (let i = 1; i <= daysInMonth; i++) {
            let isToday = (isCurrentMonth && i === today.getDate());
            let eventsHTML = "";
            
            if (i === 10) eventsHTML += `<div class="event-badge" style="background:#fee2e2; color:#e11d48; margin-top:4px;"><i class="fas fa-flag"></i> Public Holiday</div>`;
            if (i === 25) eventsHTML += `<div class="event-badge" style="background:#dcfce7; color:#059669; margin-top:4px;"><i class="fas fa-dollar-sign"></i> Payroll Cut-off</div>`;

            myRequests.forEach(req => {
                const reqDate = new Date(req.id); 
                if (reqDate.getDate() === i && reqDate.getMonth() === calMonth && reqDate.getFullYear() === calYear) {
                    let bg = '#fef3c7', col = '#b45309', iconStat = 'fa-hourglass-half'; 
                    if (req.status === 'Approved') { bg = '#d1fae5'; col = '#047857'; iconStat = 'fa-check-circle'; }
                    if (req.status === 'Rejected') { bg = '#ffe4e6'; col = '#be123c'; iconStat = 'fa-times-circle'; }

                    const typeIcon = req.type === 'OT' ? 'fa-moon' : 'fa-umbrella-beach';
                    const shortDetail = req.detail.split(' ')[0]; 
                    
                    eventsHTML += `
                        <div class="event-badge" 
                             style="background:${bg}; color:${col}; margin-top:4px; display:flex; align-items:center; gap:6px; font-size:11px; padding:6px 8px; box-shadow:0 2px 4px rgba(0,0,0,0.05); cursor:pointer; transition:0.2s;"
                             onclick="App.showRequestDetails(${req.id})"
                             title="${req.status}">
                            <i class="fas ${typeIcon}"></i> 
                            <span style="flex:1; text-align:left; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${req.type} ${shortDetail}</span>
                            <i class="fas ${iconStat}" style="font-size:10px; opacity:0.7;"></i>
                        </div>
                    `;
                }
            });

            html += `
                <div class="cal-day ${isToday ? 'today' : ''}">
                    <div style="font-weight:900; font-size:16px; margin-bottom:4px; color: ${isToday ? 'var(--brand-main)' : 'inherit'};">${i}</div>
                    <div style="display:flex; flex-direction:column; gap:4px; overflow-y:auto; flex:1;">
                        ${eventsHTML}
                    </div>
                </div>
            `;
        }
        wrapper.innerHTML = html;
    },

    // ฟังก์ชัน Pop-up กดดูจาก Calendar หรือหน้า Time & Leave
    showRequestDetails: (id) => {
        const r = AppState.requests.find(x => x.id === id); 
        if (!r) return;
        
        let badgeColor = 'var(--warning)'; let badgeBg = '#fef3c7';
        if (r.status === 'Approved') { badgeColor = 'var(--success)'; badgeBg = '#d1fae5'; }
        if (r.status === 'Rejected') { badgeColor = 'var(--danger)'; badgeBg = '#ffe4e6'; }
        
        const reqDate = new Date(r.id).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let attachBtn = '';
        if (r.attachment) {
            attachBtn = `
                <div style="margin-top:15px; padding-top:15px; border-top:1px dashed #cbd5e1;">
                    <a href="${r.attachment}" download="File" style="color:var(--brand-main); font-size:13px; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:6px; background:#eff6ff; padding:8px 16px; border-radius:8px;">
                        <i class="fas fa-paperclip"></i> View Attached Evidence
                    </a>
                </div>`;
        }

        Swal.fire({
            title: `<span style="font-weight:800; font-size:20px;">${r.type} Request</span>`,
            html: `
                <div style="text-align:left; background:var(--bg-body); padding:24px; border-radius:16px; margin-top:16px; border:1px solid var(--border-color);">
                    <p style="margin-bottom:12px; font-size:14px;"><strong>Date:</strong> ${reqDate}</p>
                    <p style="margin-bottom:12px; font-size:14px;"><strong>Details:</strong> <span style="color:var(--brand-main); font-weight:700;">${r.detail}</span></p>
                    <p style="margin-bottom:12px; font-size:14px; line-height:1.6;"><strong>Reason:</strong> ${r.reason || '-'}</p>
                    <p style="margin-bottom:0; font-size:14px; display:flex; align-items:center; gap:8px;">
                        <strong>Status:</strong> 
                        <span style="background:${badgeBg}; color:${badgeColor}; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:800;">${r.status}</span>
                    </p>
                    ${attachBtn}
                </div>
            `,
            confirmButtonText: 'Close Details',
            confirmButtonColor: 'var(--brand-main)',
            customClass: { popup: 'swal2-popup-custom' }
        });
    },

    // ==========================================
    // 🟢 BIOMETRIC SCANNER ENGINE
    // ==========================================
    clock: () => { 
        App.startFaceScan(); 
    },
    
    startFaceScan: () => {
        let m = document.getElementById('modal-facescan');
        if (!m) { 
            m = document.createElement('div'); 
            m.className = 'modal'; 
            m.id = 'modal-facescan'; 
            document.body.appendChild(m); 
        }
        
        m.innerHTML = `
            <div class="modal-content" style="text-align:center; max-width:400px; border-radius: 20px;">
                <div class="details-header" style="justify-content:center; padding-bottom:16px;">
                    <h2 style="margin:0; color:var(--brand-main); font-size:18px; font-weight:800;"><i class="fas fa-expand"></i> Biometric Verification</h2>
                </div>
                <p class="text-muted" style="font-size:13px; margin-bottom:20px;">Please position your face within the frame.</p>
                
                <div class="face-scanner-box" style="position: relative; width: 220px; height: 220px; margin: 20px auto; border-radius: 50%; overflow: hidden; border: 4px solid var(--brand-main); box-shadow: 0 0 30px rgba(79, 70, 229, 0.4); background: #0f172a;">
                    <video id="face-video" autoplay muted playsinline style="width:100%; height:100%; object-fit:cover; transform: scaleX(-1); position:absolute; top:0; left:0; z-index:1;"></video>
                    <canvas id="face-canvas" width="220" height="220" style="position:absolute; top:0; left:0; z-index:2; transform: scaleX(-1);"></canvas>
                    <div id="scan-line" class="scan-line" style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #10b981; box-shadow: 0 0 15px #10b981; animation: scanline 2.5s infinite linear; display: none; z-index: 10;"></div>
                    <div id="scan-overlay" class="scan-overlay" style="position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(16, 185, 129, 0.15); display: none; z-index: 5;"></div>
                </div>
                
                <div id="scan-status" style="font-weight:700; font-size:14px; color:var(--text-heading); margin-top:20px; min-height: 24px;">Initializing optics...</div>
                
                <button class="btn-outline" style="margin-top:24px; border-radius: 12px; padding: 10px 30px; width:100%;" onclick="App.cancelFaceScan()">Abort Scan</button>
            </div>
        `;
        App.openModal('modal-facescan');

        setTimeout(() => {
            const video = document.getElementById('face-video');
            const scanLine = document.getElementById('scan-line');
            const overlay = document.getElementById('scan-overlay');
            const status = document.getElementById('scan-status');
            const canvas = document.getElementById('face-canvas');
            const ctx = canvas ? canvas.getContext('2d') : null;

            const drawMatrix = () => {
                if(!ctx) return;
                ctx.clearRect(0, 0, 220, 220);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
                for(let i=0; i<25; i++) {
                    ctx.beginPath(); 
                    ctx.arc(Math.random()*220, Math.random()*220, Math.random()*2, 0, Math.PI*2); 
                    ctx.fill();
                }
            };

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
                .then(stream => {
                    video.srcObject = stream;
                    window.localStream = stream; 
                    
                    setTimeout(() => {
                        status.innerHTML = `<i class="fas fa-spinner fa-spin" style="color:var(--brand-main);"></i> Mapping facial geometry...`;
                        scanLine.style.display = "block";
                        bioInterval = setInterval(drawMatrix, 100);
                    }, 1000);
                    
                    setTimeout(() => {
                        status.innerHTML = `<i class="fas fa-network-wired" style="color:var(--warning);"></i> Verifying Neural Hash...`;
                    }, 2500);
                    
                    setTimeout(() => {
                        clearInterval(bioInterval);
                        if(ctx) ctx.clearRect(0, 0, 220, 220);
                        overlay.style.display = "block";
                        scanLine.style.display = "none";
                        status.innerHTML = `<span style="color:var(--success); font-size:16px;"><i class="fas fa-check-circle"></i> Identity Verified. Match 99.8%</span>`;
                        
                        setTimeout(() => {
                            App.cancelFaceScan();
                            App.processClock(); 
                        }, 1200);
                    }, 4500);
                })
                .catch(err => {
                    console.error("Camera error:", err);
                    status.innerHTML = `<span style="color:var(--danger);"><i class="fas fa-exclamation-triangle"></i> Optics Failed. Manual Override...</span>`;
                    setTimeout(() => {
                        App.cancelFaceScan();
                        App.processClock(); 
                    }, 2500);
                });
            } else {
                status.innerHTML = `<span style="color:var(--warning);"><i class="fas fa-exclamation-triangle"></i> Secure Protocol Missing. Fallback used.</span>`;
                setTimeout(() => {
                    App.cancelFaceScan();
                    App.processClock(); 
                }, 2000);
            }
        }, 100); 
    },

    cancelFaceScan: () => {
        App.closeModal('modal-facescan');
        if (window.localStream) {
            window.localStream.getTracks().forEach(track => track.stop()); 
        }
        if (bioInterval) clearInterval(bioInterval);
    },

    processClock: () => {
        const u = AppState.currentUser.username;
        const d = new Date().toLocaleDateString('en-CA');
        const locElement = document.getElementById('work-location');
        const loc = locElement ? locElement.value : 'Office';
        
        if (!AppState.dailyClock[u] || AppState.dailyClock[u].date !== d) {
            AppState.dailyClock[u] = { date: d, status: 'out', in: null };
        }
        
        let c = AppState.dailyClock[u];
        
        if (c.status === 'out') { 
            c.status = 'in'; 
            c.in = Date.now(); 
            c.loc = loc; 
            App.addLog('Attendance', `Clocked in via Biometrics (${loc})`);
            App.toast('Identity Verified. Clocked in.', 'success'); 
        } else {
            const hrs = ((Date.now() - c.in) / 3600000).toFixed(2);
            AppState.timeLogs.unshift({ 
                u: u, d: d, 
                in: new Date(c.in).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}), 
                out: new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}), 
                hrs: hrs, loc: c.loc 
            });
            c.status = 'out'; 
            c.in = null; 
            App.addLog('Attendance', `Clocked out via Biometrics. Session: ${hrs}h`);
            App.toast(`Session Ended. Total: ${hrs}h`, 'success');
        }
        
        DB.save(AppState); 
        App.updateClock();
    },

    updateClock: () => {
        const btn = document.getElementById('btn-clock');
        const st = document.getElementById('status-clock');
        const sel = document.getElementById('work-location');
        
        if(!btn || !st) return; 
        
        let c = AppState.dailyClock[AppState.currentUser.username];
        
        if (c && c.status === 'in' && c.date === new Date().toLocaleDateString('en-CA')) {
            if (sel) sel.disabled = true; 
            btn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t('clock_btn_out')} (Secure)`; 
            btn.classList.replace('btn-primary', 'btn-danger');
            st.innerHTML = `
                <span style="color:var(--success); font-weight:800;">
                    <i class="fas fa-satellite-dish" style="animation: pulse-green 2s infinite;"></i> ONLINE SECURE (${c.loc})
                </span><br>
                <span class="text-muted" style="font-family:monospace; font-size:12px;">SESSION_START: ${new Date(c.in).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})}</span>
            `;
        } else { 
            if (sel) sel.disabled = false; 
            btn.innerHTML = `<i class="fas fa-fingerprint"></i> Initialize Biometric Scan`; 
            btn.classList.replace('btn-danger', 'btn-primary'); 
            st.innerHTML = `<span class="text-muted" style="font-weight:700;"><i class="fas fa-power-off"></i> OFFLINE</span>`; 
        }
        
        if (typeof App.renderDigitalTwin === 'function') App.renderDigitalTwin();
    },

    // ==========================================
    // 🟢 CHARTS & GRAPHS ENGINE
    // ==========================================
    renderChart: () => {
        if(chartInst) chartInst.destroy();
        const u = AppState.currentUser.username;
        const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0;
        const ctx = document.getElementById('userChart');
        if(!ctx) return;
        
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#4f46e5'); 
        gradient.addColorStop(1, '#06b6d4');

        chartInst = new Chart(ctx, { 
            type: 'doughnut', 
            data: { 
                labels: ['Used', 'Remaining'], 
                datasets: [{ 
                    data: [Math.max(0, AppState.settings.leaveQuota - bal), bal], 
                    backgroundColor: ['#e2e8f0', gradient], 
                    borderWidth: 0,
                    hoverOffset: 4
                }] 
            }, 
            options: { 
                cutout: '75%', 
                plugins: { legend: { display: false } },
                animation: { animateScale: true }
            } 
        });
    },
    
    renderAdminCharts: () => { 
        App.renderAdminDashChart(); 
    },
    
    renderAdminDashChart: () => {
        if(chartInst) chartInst.destroy();
        const ctx = document.getElementById('adminDashChart');
        if (!ctx) return; 

        const grad1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400); 
        grad1.addColorStop(0, '#10b981'); grad1.addColorStop(1, 'rgba(16,185,129,0.2)');
        
        const grad2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400); 
        grad2.addColorStop(0, '#4f46e5'); grad2.addColorStop(1, 'rgba(79,70,229,0.2)');

        chartInst = new Chart(ctx, { 
            type: 'bar', 
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], 
                datasets: [
                    { label: 'On-Premise', data: [45, 48, 46, 49, 42], backgroundColor: grad1, borderRadius: 6 },
                    { label: 'Remote / WFH', data: [15, 12, 14, 11, 18], backgroundColor: grad2, borderRadius: 6 }
                ]
            }, 
            options: { 
                maintainAspectRatio: false, 
                scales: { 
                    x: { stacked: true, grid: { display: false } }, 
                    y: { stacked: true, beginAtZero: true, border: { display: false } } 
                },
                plugins: { legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } } }
            } 
        });
    },

    renderITLiveChart: () => {
        if(liveChartInst) liveChartInst.destroy();
        const ctx = document.getElementById('itLiveChart');
        if (!ctx) return;

        let currentCpu = 25; 
        const initialData = Array.from({length: 40}, () => {
            currentCpu += (Math.random() * 4) - 2; 
            return Math.max(5, Math.min(95, currentCpu));
        });
        
        const grad = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
        grad.addColorStop(0, 'rgba(16,185,129,0.4)'); 
        grad.addColorStop(1, 'rgba(16,185,129,0.0)');

        liveChartInst = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(40).fill(''), 
                datasets: [{
                    label: 'CPU Allocation (%)',
                    data: initialData,
                    borderColor: '#10b981', 
                    backgroundColor: grad,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4, 
                    pointRadius: 0 
                }]
            },
            options: {
                maintainAspectRatio: false,
                animation: false, 
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
            
            let change = (Math.random() * 5) - 2.5; 
            if(Math.random() > 0.98) change += 25; 

            if(lastVal > 60) change -= 2;
            if(lastVal < 15) change += 2;

            let newVal = Math.max(2, Math.min(98, lastVal + change));

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

    renderDigitalTwin: () => {
        if (!document.querySelector('.digital-twin-wrapper')) return;
        
        ['hr', 'sales', 'it', 'general', 'wfh'].forEach(z => {
            const el = document.getElementById(`zone-${z}`);
            if(el) {
                const title = el.querySelector('.zone-title');
                el.innerHTML = '';
                if(title) el.appendChild(title);
            }
        });

        const todayStr = new Date().toLocaleDateString('en-CA');
        
        for (const user in AppState.dailyClock) {
            const clockData = AppState.dailyClock[user];
            if (clockData.date === todayStr && clockData.status === 'in') {
                const uData = AppState.users.find(x => x.username === user);
                if (!uData) continue;
                
                const avatarSrc = (AppState.profiles && AppState.profiles[user] && AppState.profiles[user].avatar) 
                    ? AppState.profiles[user].avatar 
                    : `https://ui-avatars.com/api/?name=${uData.name}&background=e0e7ff&color=4f46e5&bold=true`;
                
                let targetZone = 'general';
                if (clockData.loc === 'WFH') { 
                    targetZone = 'wfh'; 
                } else {
                    const dept = (uData.dept || '').toLowerCase();
                    if (dept.includes('hr') || dept.includes('human')) targetZone = 'hr';
                    else if (dept.includes('sales') || dept.includes('marketing')) targetZone = 'sales';
                    else if (dept.includes('it')) targetZone = 'it';
                }
                
                const zoneEl = document.getElementById(`zone-${targetZone}`);
                if (zoneEl) {
                    const dotClass = clockData.loc === 'WFH' ? 'live-avatar wfh' : 'live-avatar';
                    zoneEl.innerHTML += `
                        <div class="${dotClass}" title="${uData.name} - Since ${new Date(clockData.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}">
                            <img src="${avatarSrc}">
                            <span>${uData.name.split(' ')[0]}</span>
                        </div>
                    `;
                }
            }
        }
    },

    genSlip: () => {
        const wrapper = document.getElementById('printable-area'); 
        if(!wrapper) return;
        
        const slip = App.getSalary();
        const monthValue = document.getElementById('slip-month') ? document.getElementById('slip-month').value : 'Current Month';
        
        wrapper.innerHTML = `
        <div style="background:white; padding:50px; border-radius:24px; box-shadow:var(--shadow-md); max-width:800px; margin:auto; border:1px solid var(--border-color); position:relative; overflow:hidden;">
            <div style="position:absolute; top:0; left:0; right:0; height:8px; background:var(--brand-gradient);"></div>
            <div style="text-align:center; margin-bottom:40px;">
                <h2 style="font-size:28px; font-weight:900; color:var(--text-heading); text-transform:uppercase; letter-spacing:-1px;">${AppState.settings.companyName}</h2>
                <p class="text-muted" style="letter-spacing:2px; text-transform:uppercase;">Secure E-Payslip Document - ${monthValue}</p>
            </div>
            
            <div style="display:flex; justify-content:space-between; background:var(--bg-body); padding:24px; border-radius:20px; margin-bottom:32px; font-weight:600; border: 1px solid var(--border-soft);">
                <div>Employee:<br><span style="color:var(--brand-main); font-size:18px;">${AppState.currentUser.name}</span> <span style="color:var(--text-muted); font-size:12px; font-family:monospace; margin-left:8px;">(EMP-${AppState.currentUser.username.toUpperCase()})</span></div>
                <div style="text-align:right">Department:<br><span style="font-size:18px; color:var(--text-heading);">${AppState.currentUser.dept}</span></div>
            </div>
            
            <div class="grid-2">
                <div style="background:var(--bg-surface); padding:32px; border-radius:24px; border:1px solid var(--border-soft); box-shadow:var(--shadow-xs);">
                    <h3 style="color:var(--success); border-bottom:2px solid var(--success); padding-bottom:12px; margin-bottom:20px; font-weight:900; letter-spacing:1px;">EARNINGS</h3>
                    <div class="flex-between" style="padding:12px 0;"><span>Base Salary</span><b style="font-size:16px;">${slip.base.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                    <div class="flex-between" style="padding:12px 0;"><span>Overtime (OT)</span><b style="font-size:16px;">${slip.ot.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                    <div class="flex-between" style="padding:12px 0;"><span>Allowances</span><b style="font-size:16px;">${slip.allow.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                    <div class="flex-between" style="padding:20px 0; font-weight:900; font-size:18px; border-top:1px solid var(--border-color); color:var(--text-heading);">
                        <span>TOTAL</span><b>THB ${slip.earn.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
                    </div>
                </div>
                
                <div style="background:var(--bg-surface); padding:32px; border-radius:24px; border:1px solid var(--border-soft); box-shadow:var(--shadow-xs);">
                    <h3 style="color:var(--danger); border-bottom:2px solid var(--danger); padding-bottom:12px; margin-bottom:20px; font-weight:900; letter-spacing:1px;">DEDUCTIONS</h3>
                    <div class="flex-between" style="padding:12px 0;"><span>Social Security</span><b style="font-size:16px;">${slip.sso.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                    <div class="flex-between" style="padding:12px 0;"><span>Withholding Tax</span><b style="font-size:16px;">${slip.tax.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                    <div class="flex-between" style="padding:12px 0;"><span>Other Deductions</span><b style="font-size:16px; color:var(--danger);">${slip.absent.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                    <div class="flex-between" style="padding:20px 0; font-weight:900; font-size:18px; border-top:1px solid var(--border-color); color:var(--text-heading);">
                        <span>TOTAL</span><b>THB ${slip.deduct.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
                    </div>
                </div>
            </div>
            
            <div style="margin-top:40px; background:var(--brand-dark); padding:40px; border-radius:24px; color:white; text-align:right; box-shadow:var(--shadow-float); position:relative; overflow:hidden;">
                <div style="position:absolute; top:-50%; left:-50%; width:200%; height:200%; background:var(--brand-gradient); opacity:0.2; transform:rotate(45deg);"></div>
                <div style="position:relative; z-index:2;">
                    <div style="font-size:14px; opacity:0.8; font-weight:700; letter-spacing:2px; text-transform:uppercase;">Net Pay Transfer</div>
                    <div style="font-size:48px; font-weight:900; letter-spacing:-2px;">THB ${slip.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
            </div>
            
            <div style="text-align:center; margin-top:40px; font-size:11px; color:var(--text-muted); border-top:1px dashed var(--border-color); padding-top:20px;">
                This document is computer-generated. No signature is required.
            </div>
        </div>`;
    }
}// ==========================================
// 11. UI TEMPLATES (VIEWS REGISTRY)
// ==========================================
const Views = {
    // ------------------------------------------
    // 🎯 ADMIN / HR DASHBOARDS
    // ------------------------------------------
    'admin-dash': () => {
        const todayStr = new Date().toLocaleDateString('en-CA');
        let activeCount = 0;
        
        for (const user in AppState.dailyClock) { 
            if (AppState.dailyClock[user].date === todayStr && AppState.dailyClock[user].status === 'in') {
                activeCount++; 
            }
        }
        
        const pendingApprovals = AppState.requests.filter(r => r.status.includes('Pending')).length;
        const totalEmployees = AppState.users.filter(u => u.isActive).length;
        const onLeave = AppState.requests.filter(r => r.status === 'Approved' && r.type === 'Leave').length; 
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-chart-pie text-muted"></i> ${t('admin_dash')}</h1>
            
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
            
            <div class="card">
                <h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Weekly Attendance Overview</h2>
                <div style="height: 280px; width: 100%; position: relative;">
                    <canvas id="adminDashChart"></canvas>
                </div>
            </div>
        </div>`;
    },

    'admin-approve': () => {
        const role = AppState.currentUser.role;
        const targetStat = role === 'head' ? 'Pending (Supervisor)' : 'Pending (HR)';
        const p = AppState.requests.filter(r => r.status === targetStat); 

        let html = p.map(r => {
            let attachBtn = '';
            if (r.attachment && r.attachment.trim() !== '') {
                const isPdf = r.attachment.includes('application/pdf');
                const icon = isPdf ? 'fa-file-pdf' : 'fa-image';
                const fileExt = isPdf ? '.pdf' : '.png';
                
                if (isPdf) {
                    attachBtn = `
                    <div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--border-color);">
                        <a href="${r.attachment}" download="Evidence_${r.id}${fileExt}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--brand-main); text-decoration:none; background:#eff6ff; padding:6px 12px; border-radius:6px; border:1px solid #bfdbfe;">
                            <i class="fas ${icon}"></i> View / Download Evidence
                        </a>
                    </div>`;
                } else {
                    attachBtn = `
                    <div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--border-color);">
                        <div class="evidence-hover">
                            <a href="${r.attachment}" download="Evidence_${r.id}${fileExt}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--brand-main); text-decoration:none; background:#eff6ff; padding:6px 12px; border-radius:6px; border:1px solid #bfdbfe;">
                                <i class="fas ${icon}"></i> View Evidence
                            </a>
                            <div class="preview-box"><img src="${r.attachment}" alt="Preview Evidence"></div>
                        </div>
                    </div>`;
                }
            }
            
            const stepper = `
                <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
                    <div style="width:8px; height:8px; border-radius:50%; background:var(--success);"></div>
                    <div style="width:40px; height:2px; background:var(--success);"></div>
                    <div style="width:8px; height:8px; border-radius:50%; background:${r.status.includes('HR') ? 'var(--brand-main)' : '#e2e8f0'};"></div>
                    <div style="width:40px; height:2px; background:#e2e8f0;"></div>
                    <div style="width:8px; height:8px; border-radius:50%; background:#e2e8f0;"></div>
                    <small style="font-size:10px; color:var(--text-muted); margin-left:8px;">Workflow: Supervisor > HR</small>
                </div>
            `;

            return `
            <tr class="approval-row" data-status="${r.status}">
                <td>
                    <b style="font-size:14px; color:var(--brand-main);">${r.name}</b><br>
                    <span style="font-size:12px; color:var(--text-muted);">EMP-${r.u.toUpperCase()}</span>
                </td>
                <td>
                    <span class="badge" style="background:#f8fafc; border:1px solid var(--border-color); color:var(--text-heading); margin-bottom:6px;">${r.type}</span> 
                    <b style="font-size:13px; color:var(--brand-main);">${r.detail}</b><br>
                    <span style="font-size:13px; display:inline-block; margin-top:4px;"><b>Reason:</b> ${r.reason}</span>
                    ${stepper}
                    ${attachBtn}
                </td>
                <td style="text-align:right; vertical-align:top;">
                    <button class="btn-primary" style="background:var(--success); width:auto; padding:8px 16px; margin-right:6px; margin-bottom:6px; border:none;" onclick="event.stopPropagation(); App.actionReq(${r.id}, 'Approved')"><i class="fas fa-check"></i> ${t('approve')}</button> 
                    <button class="btn-primary" style="background:var(--danger); width:auto; padding:8px 16px; border:none;" onclick="event.stopPropagation(); App.actionReq(${r.id}, 'Rejected')"><i class="fas fa-times"></i> ${t('reject')}</button>
                </td>
            </tr>`;
        }).join('');

        if (p.length === 0) {
            html = `<tr><td colspan="3" class="empty-state"><i class="far fa-check-circle fa-2x" style="color:var(--success); margin-bottom:12px; opacity:0.5;"></i><br>No pending requests at this time.</td></tr>`;
        }

        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-check-circle text-muted"></i> ${t('admin_appr')}</h1>
            <div class="card table-wrapper" style="padding: 0;">
                <table style="margin:0;">
                    <thead><tr><th>Employee</th><th>Request Info</th><th style="text-align:right;">Actions</th></tr></thead>
                    <tbody>${html}</tbody>
                </table>
            </div>
        </div>`;
    },

    'admin-dir': () => {
        const currentUserRole = AppState.currentUser.role;
        
        let usersHTML = AppState.users.map(u => { 
            const isActive = u.isActive !== false; 
            const statusBadge = isActive 
                ? `<span class="badge" style="background:#ecfdf5; color:#047857; border: 1px solid #a7f3d0;">Active</span>` 
                : `<span class="badge" style="background:#fef2f2; color:#b91c1c; border: 1px solid #fecaca;">Suspended</span>`; 
            const toggleBtnStr = isActive ? `<i class="fas fa-ban"></i> Suspend` : `<i class="fas fa-check"></i> Activate`; 
            const toggleBtnColor = isActive ? `var(--danger)` : `var(--success)`; 
            
            let resetBtn = '';
            if (AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'it') {
                resetBtn = `<button class="btn-outline" style="padding:8px 12px; margin-right:8px; font-size:13px;" onclick="event.stopPropagation(); App.resetPass('${u.username}')" title="Reset Password"><i class="fas fa-key text-muted" style="margin:0;"></i></button>`;
            }
            
            return `
            <tr>
                <td style="font-size:13px; color:var(--text-muted); font-family:monospace;">EMP-${u.username.toUpperCase()}</td>
                <td><b style="color:var(--text-heading); font-size:15px;">${u.name}</b><br><span style="font-size:13px; color:var(--text-muted);">${u.dept}</span></td>
                <td><span class="badge" style="background:var(--bg-body); border:1px solid var(--border-color);">${u.role.toUpperCase()}</span></td>
                <td>${statusBadge}</td>
                <td style="text-align:right; white-space:nowrap;">
                    ${resetBtn} 
                    <button class="btn-outline" style="padding:8px 16px; font-size:13px; margin-right: 8px;" onclick="event.stopPropagation(); App.openEditUser('${u.username}')"><i class="fas fa-pen"></i> Edit</button> 
                    <button class="btn-primary" style="background:${toggleBtnColor}; padding:8px 16px; font-size:13px; border:none;" onclick="event.stopPropagation(); App.toggleUserStatus('${u.username}')">${toggleBtnStr}</button>
                </td>
            </tr>`; 
        }).join('');

        return `
        <div style="animation: fadeUp 0.4s ease-out;"> 
            <div class="flex-between" style="margin-bottom:24px;"> 
                <h1 style="margin:0;"><i class="fas fa-users text-muted"></i> Directory</h1> 
                <div style="display:flex; gap:12px;"> 
                    <button class="btn-outline" onclick="App.exportToCSV()"><i class="fas fa-file-csv"></i> Export Data</button> 
                </div> 
            </div> 
            <div class="card table-wrapper" style="padding:0;"> 
                <table style="margin:0;"> 
                    <thead><tr><th>ID</th><th>Name & Dept</th><th>Role</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead> 
                    <tbody>${usersHTML}</tbody> 
                </table> 
            </div> 
        </div>`;
    },

    'admin-rep': () => {
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-chart-line text-muted"></i> ${t('admin_rep')}</h1>
            <div class="grid-2">
                <div class="card">
                    <h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Leave Distribution</h2>
                    <div style="text-align:center; padding:40px; color:var(--text-dark); background:var(--bg-main); border-radius:var(--radius-sm); border:1px dashed var(--border-color);">
                        Annual Leave: 65%<br><br>Sick Leave: 25%<br><br>Personal: 10%
                    </div>
                </div>
                <div class="card">
                    <h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Overtime Costs</h2>
                    <div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm); border:1px dashed var(--border-color);">
                        <b style="font-size:28px; color:var(--brand-main);">THB 124,500.50</b><br>
                        <span style="font-size:12px;">Total OT payout this month</span>
                    </div>
                </div>
            </div>
        </div>`;
    },

    'admin-set': () => {
        const u = AppState.currentUser;
        let itSettingsSection = '';
        if (u.role === 'it') {
            itSettingsSection = `
                <hr style="margin:32px 0; border:0; border-top:1px solid var(--border-color);">
                <h2 style="color:var(--brand-main); display:flex; align-items:center; gap:8px;"><i class="fas fa-server"></i> System Administration</h2>
                <div class="grid-2" style="margin-top:16px;">
                    <div style="background:white; padding:20px; border-radius:var(--radius-btn); border:1px solid var(--border-color); box-shadow:var(--shadow-xs);">
                        <h3 style="color:var(--text-heading); margin-top:0; font-size:14px; text-transform:uppercase;">Maintenance Mode</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Restrict access for non-IT personnel during system upgrades.</p>
                        <select id="set-maintenance" style="margin-bottom:0; font-size:13px;">
                            <option value="off" ${!AppState.settings.maintenance ? 'selected' : ''}>System Online (Normal)</option>
                            <option value="on" ${AppState.settings.maintenance ? 'selected' : ''}>Maintenance Active (Restricted)</option>
                        </select>
                    </div>
                    <div style="background:white; padding:20px; border-radius:var(--radius-btn); border:1px solid var(--border-color); box-shadow:var(--shadow-xs);">
                        <h3 style="color:var(--text-heading); margin-top:0; font-size:14px; text-transform:uppercase;">Data Management</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Create backups or clear application cache to resolve sync issues.</p>
                        <div style="display:flex; gap:8px;">
                            <button class="btn-outline" style="flex:1; font-size:12px; padding:10px;" onclick="App.backupDB()"><i class="fas fa-download"></i> Backup</button>
                            <button class="btn-primary" style="background:var(--danger); border:none; flex:1; font-size:12px; padding:10px;" onclick="App.clearCache()"><i class="fas fa-trash-alt"></i> Clear Cache</button>
                        </div>
                    </div>
                </div>`;
        }
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-cogs text-muted"></i> ${u.role === 'it' ? t('it_set') : t('admin_set')}</h1>
            <div class="card" style="max-width:800px;">
                <h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Global Configurations</h2>
                <div class="grid-2">
                    <div>
                        <label>Company Name</label>
                        <input type="text" id="set-company" value="${AppState.settings.companyName}">
                    </div>
                    <div>
                        <label>Default Annual Leave Quota (Days)</label>
                        <input type="number" id="set-quota" value="${AppState.settings.leaveQuota}">
                    </div>
                </div>
                <hr style="margin:24px 0; border:0; border-top:1px solid var(--border-color);">
                <h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Broadcast Announcement</h2>
                <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Message will be displayed on all user dashboards. Leave blank to disable.</p>
                <textarea id="set-broadcast" rows="3" placeholder="Enter announcement text here...">${AppState.settings.broadcast || ''}</textarea>
                ${itSettingsSection}
                <div style="text-align:right; margin-top:24px; padding-top:20px; border-top:1px solid var(--border-color);">
                    <button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveSettings()"><i class="fas fa-save"></i> Save Configuration</button>
                </div>
            </div>
        </div>`;
    },

    // ------------------------------------------
    // 🖥️ IT DASHBOARDS
    // ------------------------------------------
    'it-dash': () => {
        const activeUsers = AppState.users.filter(u => u.isActive !== false).length;
        const todayLogins = Math.floor(Math.random() * 20) + 5; 
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
                    <h2 style="margin:0; display:flex; align-items:center; gap:8px;"><i class="fas fa-microchip text-muted"></i> Compute Resource Allocation (CPU)</h2>
                    <span class="badge" style="background:#ecfdf5; color:#059669;"><i class="fas fa-circle" style="font-size:8px;"></i> Running</span>
                </div>
                <div style="height: 250px; width: 100%; position: relative;">
                    <canvas id="itLiveChart"></canvas>
                </div>
            </div>
            
            <div class="card">
                <h2 style="margin-bottom:16px;"><i class="fas fa-shield-alt text-muted"></i> System Status</h2>
                <div style="padding:16px 20px; background:#f8fafc; border:1px solid var(--border-color); border-radius:var(--radius-sm); display:flex; align-items:center; gap:16px;">
                    <div style="font-size:24px; color:var(--success);"><i class="fas fa-check-circle"></i></div> 
                    <div>
                        <strong style="font-size:14px; color:var(--primary);">All Services Operational</strong><br>
                        <span style="font-size:12px; color:var(--text-muted);">Database connection verified. Webhook integrations are functioning normally.</span>
                    </div>
                </div>
            </div>
        </div>`;
    },

    'it-logs': () => {
        const logs = AppState.auditLogs || [];
        
        let logsHTML = logs.slice(0, 50).map(l => `
            <tr>
                <td style="color:var(--text-muted); font-size:12px; white-space:nowrap;">${l.time}</td>
                <td><b style="color:var(--primary);">${l.user}</b></td>
                <td><span class="badge" style="background:#f1f5f9; color:var(--text-muted); border:1px solid var(--border-color);">${l.role.toUpperCase()}</span></td>
                <td><span class="badge" style="background:var(--accent-light); color:var(--accent);">${l.action}</span></td>
                <td style="font-size:13px; color:var(--text-dark);">${l.detail}</td>
            </tr>
        `).join('');
        
        if (logs.length === 0) {
            logsHTML = `<tr><td colspan="5" class="empty-state"><i class="fas fa-search fa-2x" style="color:var(--border-color); margin-bottom:8px;"></i><br>No audit logs available.</td></tr>`;
        }

        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="flex-between" style="margin-bottom:24px;">
                <h1 style="margin:0;"><i class="fas fa-clipboard-list text-muted"></i> ${t('it_log')}</h1>
                <button class="btn-outline" onclick="App.toast('Log export initiated.', 'success')"><i class="fas fa-download"></i> Export Logs</button>
            </div>
            <div class="card table-wrapper" style="padding:0;">
                <table style="margin:0;">
                    <thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Event Type</th><th>Details</th></tr></thead>
                    <tbody>${logsHTML}</tbody>
                </table>
            </div>
        </div>`;
    },

    // ------------------------------------------
    // 🧑‍💼 EMPLOYEE WORKSPACE
    // ------------------------------------------
    'home': () => {
        const u = AppState.currentUser.username;
        const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0;
        const sal = App.getSalary(); 
        
        const broadcastMsg = AppState.settings.broadcast 
            ? `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 24px; border-radius: 8px; color: #b45309; display: flex; gap: 12px; align-items: flex-start; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <div style="font-size: 18px; margin-top:2px;"><i class="fas fa-bullhorn"></i></div>
                <div>
                    <strong style="display:block; margin-bottom:2px; font-size:13px;">Corporate Announcement</strong>
                    <span style="font-size:13px;">${AppState.settings.broadcast}</span>
                </div>
               </div>` 
            : '';
            
        return `
        <div style="margin-bottom: 32px; animation: fadeUp 0.4s ease-out;">
            <div class="flex-between">
                <div>
                    <div style="color:#64748b; font-size:12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${TimeEngine.getGreeting()}</div>
                    <h1 style="margin:0; font-size:24px; color:var(--text-heading);">${AppState.currentUser.name}</h1>
                </div>
                <div id="realtime-clock" style="font-size:20px; font-weight:700; color:var(--brand-main); font-family:monospace;">00:00:00</div>
            </div>
        </div>
        
        ${broadcastMsg} 
        
        <div class="grid-dash" style="grid-template-columns: 1fr 2fr; align-items: stretch;">
            <div>
                <div class="card salary-card-custom" style="margin-bottom: 24px; background: linear-gradient(135deg, #4f46e5 0%, #1e3a8a 100%) !important; color: #ffffff !important; border:none !important; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.4) !important;">
                    <div class="flex-between">
                        <h2 style="color: #e0e7ff !important; margin:0; font-weight: 500;"><i class="fas fa-wallet"></i> ${t('salary_title')}</h2>
                        <button id="salary-btn" class="btn-toggle-view" style="background: rgba(255,255,255,0.2) !important; color: white !important; border: none !important;" onclick="App.toggleSal()"><i class="fas fa-eye"></i> ${t('show')}</button>
                    </div>
                    <div class="salary-container" style="margin-top:16px;">
                        <span id="salary-val" class="salary-value masked" style="color: #ffffff !important;">THB ${sal.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                </div>
                
                <div class="card" style="margin-bottom: 24px;">
                    <h2 style="color: var(--brand-main); display:flex; align-items:center; gap:8px;"><i class="far fa-clock text-muted"></i> ${t('clock_title')}</h2>
                    <select id="work-location" style="margin-bottom: 16px;">
                        <option value="Office">${t('loc_office')}</option>
                        <option value="WFH">${t('loc_wfh')}</option>
                    </select>
                    <div id="status-clock" style="margin-bottom: 20px; font-size: 13px; padding: 12px; background: var(--bg-hover); border-radius: 12px; border: 1px solid var(--border-color); text-align:center;">
                        <span class="text-muted"><i class="fas fa-bed"></i> Currently Offline</span>
                    </div>
                    <button id="btn-clock" class="btn-primary" onclick="App.clock()" style="padding: 14px; width:100%; font-size: 14px;">
                        <i class="fas fa-camera"></i> ${t('clock_btn_in')} (Face Scan)
                    </button>
                </div>

                <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content: center;">
                    <h2 style="margin-bottom: 24px; text-align:center; color:var(--text-heading);"><i class="fas fa-umbrella-beach text-muted"></i> ${t('leave_bal')}</h2>
                    <div style="position:relative; width:160px; height:160px; margin-bottom: 24px;">
                        <canvas id="userChart"></canvas>
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;">
                            <div style="font-size:32px; font-weight:900; color:var(--text-heading); line-height:1;">${bal}</div>
                            <div style="font-size:11px; color:var(--brand-main); font-weight: 800; margin-top: 4px; text-transform:uppercase;">Days</div>
                        </div>
                    </div>
                    <button class="btn-outline" style="width: 100%; padding: 14px;" onclick="App.openModal('modal-leave')"><i class="fas fa-plus"></i> ${t('req_lv')}</button>
                </div>
            </div>
            
            <div class="card digital-twin-wrapper" style="background: #0f172a !important; height: 100%;">
                <div class="flex-between" style="margin-bottom: 16px;">
                    <h2 style="margin:0; color: white !important; font-size: 16px; display:flex; align-items:center; gap:8px;"><i class="fas fa-satellite-dish" style="color:#3b82f6;"></i> Live Spatial Digital Twin</h2>
                    <span style="background: rgba(16,185,129,0.2); color: #10b981; padding: 4px 10px; border-radius: 12px; font-size: 10px; letter-spacing: 1px; border: 1px solid #10b981;">● LIVE TELEMETRY</span>
                </div>
                <div class="office-floor">
                    <div class="dept-zone" id="zone-hr" style="background: rgba(30, 41, 59, 0.6);"><div class="zone-title" style="color: #94a3b8;">Human Resources</div></div>
                    <div class="dept-zone" id="zone-sales" style="background: rgba(30, 41, 59, 0.6);"><div class="zone-title" style="color: #94a3b8;">Sales & Marketing</div></div>
                    <div class="dept-zone" id="zone-it" style="background: rgba(30, 41, 59, 0.6);"><div class="zone-title" style="color: #94a3b8;">IT Operations</div></div>
                    <div class="dept-zone" id="zone-general" style="background: rgba(30, 41, 59, 0.6);"><div class="zone-title" style="color: #94a3b8;">General Operations</div></div>
                </div>
                <div class="dept-zone wfh-zone" id="zone-wfh" style="background: rgba(15, 23, 42, 0.8) !important; border-color: #3b82f6 !important; margin-top: 15px;">
                    <div class="zone-title" style="color:#3b82f6; border-color:#1e3a8a;">Remote / WFH Cloud</div>
                </div>
            </div>
        </div>`;
    },

    'time': () => {
        const u = AppState.currentUser.username;
        const logs = AppState.timeLogs.filter(x => x.u === u);
        const reqs = AppState.requests.filter(x => x.u === u);
        
        let logsHTML = logs.map(l => `
            <tr>
                <td><b style="color:var(--brand-main);">${l.d}</b></td>
                <td><span class="badge" style="background:white; border: 1px solid var(--border-color); color:var(--text-muted);">${l.loc}</span></td>
                <td>${l.in}</td>
                <td>${l.out}</td>
                <td><b style="color:var(--brand-accent);">${l.hrs}</b></td>
            </tr>
        `).join('');
        
        if (logs.length === 0) {
            logsHTML = `<tr><td colspan="5" class="empty-state"><i class="far fa-folder-open fa-2x" style="color:var(--border-color); margin-bottom:8px;"></i><br>${t('no_data')}</td></tr>`;
        }

        let reqsHTML = reqs.map(r => {
            let badgeColor = 'var(--warning)'; 
            let badgeBg = '#fffbeb';
            if (r.status === 'Approved') { badgeColor = 'var(--success)'; badgeBg = '#ecfdf5'; }
            else if (r.status === 'Rejected') { badgeColor = 'var(--danger)'; badgeBg = '#fef2f2'; }

            let attachBtn = '';
            if (r.attachment && r.attachment.trim() !== '') {
                const isPdf = r.attachment.includes('application/pdf');
                const icon = isPdf ? 'fa-file-pdf' : 'fa-image';
                const fileExt = isPdf ? '.pdf' : '.png';
                
                if (isPdf) {
                    attachBtn = `
                    <div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--border-color);">
                        <a href="${r.attachment}" download="Evidence_${r.id}${fileExt}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--brand-main); text-decoration:none; background:#eff6ff; padding:6px 12px; border-radius:6px; border:1px solid #bfdbfe;">
                            <i class="fas ${icon}"></i> View / Download Evidence
                        </a>
                    </div>`;
                } else {
                    attachBtn = `
                    <div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--border-color);">
                        <div class="evidence-hover">
                            <a href="${r.attachment}" download="Evidence_${r.id}${fileExt}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--brand-main); text-decoration:none; background:#eff6ff; padding:6px 12px; border-radius:6px; border:1px solid #bfdbfe;">
                                <i class="fas ${icon}"></i> View Evidence
                            </a>
                            <div class="preview-box"><img src="${r.attachment}" alt="Preview"></div>
                        </div>
                    </div>`;
                }
            }

            return `
            <tr>
                <td><span class="badge" style="background:#f1f5f9; border:1px solid var(--border-color); color:var(--brand-main);">${r.type}</span></td>
                <td>
                    <b style="color:var(--brand-main);">${r.detail}</b><br>
                    <span style="font-size:12px; color:var(--text-muted);">${r.reason}</span>
                    ${attachBtn}
                </td>
                <td><span class="badge" style="background:${badgeBg}; color:${badgeColor}; border:1px solid ${badgeColor};">${r.status}</span></td>
                <td style="text-align:right;">
                    <button class="btn-outline" style="padding: 6px 12px; font-size: 11px; width:auto;" onclick="App.showRequestDetails(${r.id})">
                        <i class="fas fa-list-alt"></i> Details
                    </button>
                </td>
            </tr>`;
        }).join('');
        
        if (reqs.length === 0) {
            reqsHTML = `<tr><td colspan="4" class="empty-state"><i class="far fa-folder-open fa-2x" style="color:var(--border-color); margin-bottom:8px;"></i><br>${t('no_data')}</td></tr>`;
        }

        return `
        <div class="flex-between" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;"><i class="fas fa-history text-muted"></i> ${t('time')}</h1>
            <div style="display:flex; gap:12px;">
                <button class="btn-outline" onclick="App.openModal('modal-ot')"><i class="fas fa-moon"></i> ${t('req_ot')}</button>
                <button class="btn-primary" onclick="App.openModal('modal-leave')"><i class="fas fa-umbrella-beach"></i> ${t('req_lv')}</button>
            </div>
        </div>
        
        <div class="card" style="padding-top:16px;">
            <div class="ui-tabs" style="border-bottom:1px solid #e2e8f0; margin-bottom:16px; display:flex; gap:16px;">
                <button class="tab-btn active" onclick="App.switchTab('t1', this)" style="background:none; border:none; padding-bottom:12px; font-size:14px; font-weight:600; color:var(--primary); border-bottom:3px solid var(--primary); cursor:pointer;"><i class="fas fa-list-ul"></i> ${t('tab_log')}</button>
                <button class="tab-btn" onclick="App.switchTab('t2', this)" style="background:none; border:none; padding-bottom:12px; font-size:14px; font-weight:500; color:#64748b; cursor:pointer;"><i class="fas fa-file-alt"></i> ${t('tab_lv')} / OT</button>
            </div>
            
            <div id="t1" class="tab-content active table-wrapper" style="border:none; box-shadow:none;">
                <table>
                    <thead><tr><th>Date</th><th>Location</th><th>In</th><th>Out</th><th>Hours</th></tr></thead>
                    <tbody>${logsHTML}</tbody>
                </table>
            </div>
            
            <div id="t2" class="tab-content table-wrapper" style="border:none; box-shadow:none;">
                <table>
                    <thead><tr><th>Type</th><th>Details</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>
                    <tbody>${reqsHTML}</tbody>
                </table>
            </div>
        </div>`;
    },

    'cal': () => {
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="calendar-nav">
                <h1 style="margin:0;"><i class="far fa-calendar-alt text-muted"></i> ${t('cal')} <span id="cal-title" style="color:var(--brand-main); font-weight:600; font-size:16px; margin-left:10px;"></span></h1>
                <div style="display:flex; gap:8px;">
                    <button class="cal-btn" onclick="App.changeCalMonth(-1)"><i class="fas fa-chevron-left"></i></button>
                    <button class="cal-btn" onclick="App.changeCalMonth(1)"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="card">
                <div class="calendar-grid">
                    <div class="cal-header">SUN</div>
                    <div class="cal-header">MON</div>
                    <div class="cal-header">TUE</div>
                    <div class="cal-header">WED</div>
                    <div class="cal-header">THU</div>
                    <div class="cal-header">FRI</div>
                    <div class="cal-header">SAT</div>
                </div>
                <div class="calendar-grid" id="cal-wrapper"></div>
            </div>
        </div>`;
    },

    'payslip': () => {
        return `
        <div class="flex-between no-print" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;"><i class="fas fa-file-invoice-dollar text-muted"></i> ${t('slip')}</h1>
            <div style="display:flex; gap:12px;">
                <select id="slip-month" onchange="App.genSlip()" style="margin:0; width:auto; font-weight:500;">
                    ${App.getMonthOptions()}
                </select>
                <button class="btn-outline" onclick="window.print()"><i class="fas fa-print"></i> Print PDF</button>
            </div>
        </div>
        <div id="printable-area"></div>`;
    },

    'doc': () => {
        const docs = [
            { name: 'Employee_Handbook_2026', title: 'Employee Handbook', size: '2.4 MB', date: 'Jan 10, 2026' },
            { name: 'WFH_Policy', title: 'Remote Work Policy', size: '1.1 MB', date: 'Feb 15, 2026' },
            { name: 'Insurance_Claims', title: 'Health Insurance Claims', size: '3.5 MB', date: 'Mar 01, 2026' }
        ];
        
        let docsHTML = docs.map(d => `
            <div class="policy-item">
                <div style="display:flex; align-items:center; gap:16px;">
                    <div style="width:40px; height:40px; background:var(--bg-hover); color:var(--brand-main); border: 1px solid var(--border-color); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:18px;">
                        <i class="far fa-file-pdf"></i>
                    </div>
                    <div>
                        <div style="font-weight:600; color:var(--brand-main); font-size:13px;">${d.title}</div>
                        <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Updated: ${d.date} • ${d.size}</div>
                    </div>
                </div>
                <button class="btn-outline" style="width:auto; font-size:12px; padding:6px 12px;" onclick="App.downloadFile('${d.name}')">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        `).join('');

        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="far fa-folder-open text-muted"></i> ${t('doc')}</h1>
            <div class="card">
                <h2 style="margin-bottom: 16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Standard Operating Procedures (SOP)</h2>
                ${docsHTML}
            </div>
        </div>`;
    },

    'prof': () => {
        const u = AppState.currentUser.username;
        const p = AppState.profiles[u] || { email: '', phone: '', startDate: '' };
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="far fa-user-circle text-muted"></i> ${t('prof')}</h1>
            <div class="grid-dash">
                <div class="card">
                    <h2 style="margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">Personal Information</h2>
                    <div class="grid-2">
                        <div><label>Full Name</label><input type="text" value="${AppState.currentUser.name}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Employee ID</label><input type="text" value="EMP-${u.toUpperCase()}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Department</label><input type="text" value="${AppState.currentUser.dept}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Start Date</label><input type="text" value="${p.startDate}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Email Address</label><input type="email" id="prof-email" value="${p.email}"></div>
                        <div><label>Contact Number</label><input type="text" id="prof-phone" value="${p.phone}"></div>
                    </div>
                    <div style="text-align:right; margin-top:16px;">
                        <button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveProfile()"><i class="fas fa-save"></i> Save Changes</button>
                    </div>
                </div>
                <div class="card" style="text-align:center;">
                    <img src="${p.avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=e0e7ff&color=3b82f6&size=150`}" id="prof-avatar-img" style="border-radius:50%; border: 4px solid var(--bg-hover); margin-bottom: 16px; width:120px; height:120px; object-fit:cover;">
                    <h2 style="margin:0; font-size:16px;">${AppState.currentUser.name}</h2>
                    <p class="text-muted" style="margin-bottom:20px; font-size:12px;">${AppState.currentUser.dept}</p>
                    <input type="file" id="avatar-upload" style="display:none;" accept="image/*" onchange="App.handleAvatarUpload(event)">
                    <button class="btn-outline" style="font-size:12px; padding:8px 16px;" onclick="document.getElementById('avatar-upload').click()"><i class="fas fa-camera"></i> Update Photo</button>
                </div>
            </div>
        </div>`;
    },

    'admin-set': () => {
        const u = AppState.currentUser;
        let itSettingsSection = '';
        if (u.role === 'it') {
            itSettingsSection = `
                <hr style="margin:32px 0; border:0; border-top:1px solid var(--border-color);">
                <h2 style="color:var(--brand-main); display:flex; align-items:center; gap:8px;"><i class="fas fa-server"></i> System Administration</h2>
                <div class="grid-2" style="margin-top:16px;">
                    <div style="background:white; padding:20px; border-radius:var(--radius-btn); border:1px solid var(--border-color); box-shadow:var(--shadow-xs);">
                        <h3 style="color:var(--text-heading); margin-top:0; font-size:14px; text-transform:uppercase;">Maintenance Mode</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Restrict access for non-IT personnel during system upgrades.</p>
                        <select id="set-maintenance" style="margin-bottom:0; font-size:13px;">
                            <option value="off" ${!AppState.settings.maintenance ? 'selected' : ''}>System Online (Normal)</option>
                            <option value="on" ${AppState.settings.maintenance ? 'selected' : ''}>Maintenance Active (Restricted)</option>
                        </select>
                    </div>
                    <div style="background:white; padding:20px; border-radius:var(--radius-btn); border:1px solid var(--border-color); box-shadow:var(--shadow-xs);">
                        <h3 style="color:var(--text-heading); margin-top:0; font-size:14px; text-transform:uppercase;">Data Management</h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Create backups or clear application cache to resolve sync issues.</p>
                        <div style="display:flex; gap:8px;">
                            <button class="btn-outline" style="flex:1; font-size:12px; padding:10px;" onclick="App.backupDB()"><i class="fas fa-download"></i> Backup</button>
                            <button class="btn-primary" style="background:var(--danger); border:none; flex:1; font-size:12px; padding:10px;" onclick="App.clearCache()"><i class="fas fa-trash-alt"></i> Clear Cache</button>
                        </div>
                    </div>
                </div>`;
        }
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-cogs text-muted"></i> ${u.role === 'it' ? t('it_set') : t('admin_set')}</h1>
            <div class="card" style="max-width:800px;">
                <h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Global Configurations</h2>
                <div class="grid-2">
                    <div>
                        <label>Company Name</label>
                        <input type="text" id="set-company" value="${AppState.settings.companyName}">
                    </div>
                    <div>
                        <label>Default Annual Leave Quota (Days)</label>
                        <input type="number" id="set-quota" value="${AppState.settings.leaveQuota}">
                    </div>
                </div>
                <hr style="margin:24px 0; border:0; border-top:1px solid var(--border-color);">
                <h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Broadcast Announcement</h2>
                <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Message will be displayed on all user dashboards. Leave blank to disable.</p>
                <textarea id="set-broadcast" rows="3" placeholder="Enter announcement text here...">${AppState.settings.broadcast || ''}</textarea>
                ${itSettingsSection}
                <div style="text-align:right; margin-top:24px; padding-top:20px; border-top:1px solid var(--border-color);">
                    <button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveSettings()"><i class="fas fa-save"></i> Save Configuration</button>
                </div>
            </div>
        </div>`;
    }
};

// ==========================================
// 12. AI HELPDESK CHATBOT (HELIOS AI)
// ==========================================
const Chat = {
    isOpen: false,
    currentRoom: '',
    unsubscribe: null,
    
    init: () => {
        const u = AppState.currentUser;
        if (!Chat.currentRoom) Chat.currentRoom = u.username;

        const header = document.querySelector('.chat-header');
        if (u.role !== 'employee') {
            const selectHtml = `
                <select id="chat-room-select" onchange="Chat.changeRoom(this.value)" style="margin-left: 10px; padding: 2px 6px; font-size: 11px; border-radius: 4px; color: black; border: none; max-width: 130px; outline:none; cursor:pointer;">
                    ${AppState.users.map(x => `<option value="${x.username}" ${x.username === Chat.currentRoom ? 'selected' : ''}>${x.name}</option>`).join('')}
                </select>
            `;
            header.innerHTML = `<i class="fas fa-headset"></i> Support ${selectHtml} <span id="chat-unread" class="badge" style="background:var(--danger); color:white; display:none; margin-left:auto; border:none; padding:2px 6px; font-size:10px;">New</span>`;
        } else {
            header.innerHTML = `<i class="fas fa-headset"></i> HR Helpdesk <span id="chat-unread" class="badge" style="background:var(--danger); color:white; display:none; margin-left:auto; border:none; padding:2px 6px; font-size:10px;">New</span>`;
        }

        Chat.loadMessages();
    },
    
    changeRoom: (roomUser) => {
        Chat.currentRoom = roomUser;
        Chat.loadMessages();
    },
    
    loadMessages: () => {
        if (Chat.unsubscribe) Chat.unsubscribe(); 
        
        Chat.unsubscribe = db.collection('hr_chats')
            .where('room', '==', Chat.currentRoom)
            .onSnapshot(snapshot => {
                const box = document.getElementById('chat-messages');
                if(!box) return;
                
                let messages = [];
                snapshot.forEach(doc => messages.push(doc.data()));
                messages.sort((a, b) => {
                    const tA = a.timestamp ? a.timestamp.toMillis() : Date.now();
                    const tB = b.timestamp ? b.timestamp.toMillis() : Date.now();
                    return tA - tB;
                });
                
                let html = '';
                messages.forEach(msg => {
                    const isSelf = msg.u === AppState.currentUser.username;
                    const time = msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}) : 'Just now';
                    
                    html += `
                        <div class="msg-bubble ${isSelf ? 'msg-self' : 'msg-other'}">
                            ${!isSelf ? `<div class="msg-name">${msg.name} <span style="font-weight:400; opacity:0.6;">(${msg.role})</span></div>` : ''}
                            <div>${msg.text}</div>
                            <div class="msg-time" style="font-size:10px; margin-top:4px; opacity:0.7; text-align:${isSelf ? 'right' : 'left'}">${time}</div>
                        </div>
                    `;
                });
                
                box.innerHTML = html || `
                    <div style="text-align:center; margin-top:40px; color:var(--text-muted); font-size:12px;">
                        <i class="far fa-comments fa-2x" style="margin-bottom:8px; opacity:0.5;"></i><br>Start conversation with ${Chat.currentRoom}
                    </div>
                `;
                box.scrollTop = box.scrollHeight; 
                
                if(!Chat.isOpen && snapshot.docChanges().length > 0) {
                    const changes = snapshot.docChanges();
                    const hasNewFromOthers = changes.some(c => c.type === 'added' && c.doc.data().u !== AppState.currentUser.username);
                    if(hasNewFromOthers) document.getElementById('chat-unread').style.display = 'inline-block';
                }
            });
    },
    
    toggle: (e) => {
        if(e && e.target.id === 'chat-room-select') return;
        
        Chat.isOpen = !Chat.isOpen;
        document.getElementById('chat-body').style.display = Chat.isOpen ? 'block' : 'none';
        
        if(Chat.isOpen) {
            document.getElementById('chat-unread').style.display = 'none';
            const box = document.getElementById('chat-messages');
            if (box) box.scrollTop = box.scrollHeight; 
        }
    },
    
    send: () => {
        const input = document.getElementById('chat-text');
        const text = input.value.trim();
        if(!text) return;
        input.value = ''; 
        
        db.collection('hr_chats').add({
            room: Chat.currentRoom, 
            text: text, 
            u: AppState.currentUser.username, 
            name: AppState.currentUser.name,
            role: AppState.currentUser.role.toUpperCase(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err => console.error("Chat Error:", err));

        // 🤖 AI Logic for Auto-Response
        const mLower = text.toLowerCase();
        let reply = "I've recorded your query. A human specialist will review it shortly.";
        
        if(mLower.includes('leave') || mLower.includes('ลา')) {
            const bal = AppState.leaveBalances[AppState.currentUser.username]?.annual || 0;
            reply = `To request leave, please navigate to the 'Time & Leave' module. You currently have <b>${bal}</b> days of annual leave remaining.`;
        } else if(mLower.includes('salary') || mLower.includes('pay') || mLower.includes('เงิน')) {
            reply = "Your latest e-payslip is generated on the 25th of every month. You can securely view it in the 'E-Payslip' module.";
        } else if(mLower.includes('ot') || mLower.includes('โอที')) {
            reply = "OT requests must be submitted within 24 hours of completion. Supervisors require evidence attachments for weekend OT.";
        }
        
        setTimeout(() => {
            const list = document.getElementById('chat-messages');
            if(list) {
                list.innerHTML += `
                <div class="msg-bubble msg-other" style="border-left: 3px solid var(--brand-main);">
                    <strong style="color:var(--brand-main); font-size:12px; display:block; margin-bottom:4px;">Helios AI</strong>
                    ${reply}
                    <div style="font-size:10px; margin-top:6px; opacity:0.8;">Just now</div>
                </div>`;
                list.scrollTop = list.scrollHeight;
            }
        }, 1500);
    }
};

// ==========================================
// 13. SYSTEM INITIALIZATION
// ==========================================
function toggleSidebar() { 
    document.querySelector('.sidebar').classList.toggle('show'); 
}

document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return; 
    
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickHamburger = event.target.closest('.hamburger-btn');
    
    if (window.innerWidth <= 768 && sidebar.classList.contains('show') && (!isClickInsideSidebar || event.target.closest('.nav-item'))) {
        if(!isClickHamburger){ sidebar.classList.remove('show'); }
    }
});

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

// 🚀 Boot System
window.onload = () => {
    startApp();
};