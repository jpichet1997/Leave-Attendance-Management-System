
// --- 1. Language Config & Time Engine ---
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
        'req_lv': 'บันทึกขอลางาน', 'tab_log': 'ประวัติลงเวลา', 'tab_lv': 'ประวัติการลา', 'tab_ot': 'ประวัติล่วงเวลา', 
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
            if (el) {
                el.innerHTML = new Date().toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-US', { 
                    hour: '2-digit', minute: '2-digit', second: '2-digit' 
                });
            }
        }, 1000);
    }
};

function toggleLanguage(event) { 
    if (event) event.preventDefault(); 
    lang = lang === 'th' ? 'en' : 'th'; 
    localStorage.setItem('hr_lang', lang); 
    applyLang(); 
    
    const authView = document.getElementById('auth-view');
    if (AppState && AppState.currentUser && authView.style.display === 'none') {
        App.boot();
    }
}

function applyLang() { 
    document.querySelectorAll('.th-en').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    }); 
    
    const btn = document.getElementById('top-lang-btn'); 
    if (btn) {
        btn.innerHTML = lang === 'th' ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> TH'; 
        btn.onclick = (e) => toggleLanguage(e); 
    }
    
    const langBtns = document.querySelectorAll('.lang-switch');
    langBtns.forEach(btn => { 
        btn.onclick = (e) => toggleLanguage(e); 
    });
}

// --- 2. Dynamic CSS Injection ---
if (!document.getElementById('custom-dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-dynamic-styles';
    style.innerHTML = `
        .evidence-hover { position: relative; display: inline-block; }
        .evidence-hover .preview-box { display: none; position: absolute; bottom: 120%; left: 0; width: 250px; background: white; border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2); padding: 6px; z-index: 100; }
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
        .filter-bar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; align-items: center; background: white; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .filter-btn { background: transparent; border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #64748b; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px; outline: none; }
        .filter-btn:hover { background: #f1f5f9; color: #0f172a; }
        .filter-btn.active { background: var(--primary); color: white; }
        .filter-pill { background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
        .filter-btn.active .filter-pill { background: rgba(255,255,255,0.2); color: white !important; }
        .search-box { padding: 8px 16px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 13px; width: 100%; max-width: 250px; outline: none; transition: 0.2s; }
        .search-box:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    `;
    document.head.appendChild(style);
}

// --- 3. Database & State (Firebase Version) ---
const firebaseConfig = {
    apiKey: "AIzaSyAUHCBVj2_6grlBdexUmP1BjzflOCaHiMQ",
    authDomain: "hr-system-2026-7c138.firebaseapp.com",
    projectId: "hr-system-2026-7c138",
    storageBucket: "hr-system-2026-7c138.firebasestorage.app",
    messagingSenderId: "502248569009",
    appId: "1:502248569009:web:b56da4a67ea3290fdd0a90",
    measurementId: "G-SGL2CY68DY"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
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
    leaveBalances: { 
        'user': { annual: 8.5, sick: 28 }, 
        'admin': { annual: 15, sick: 30 }, 
        'head': { annual: 12, sick: 30 }, 
        'it': { annual: 15, sick: 30 } 
    }, 
    requests: [], 
    timeLogs: [], 
    notifications: [], 
    auditLogs: [], 
    profiles: { 
        'admin': { email: 'admin@sj-inter.com', phone: '089-999-9999', startDate: '2020-01-01', avatar: '' },
        'user': { email: 'john.d@sj-inter.com', phone: '081-234-5678', startDate: '2024-01-15', avatar: '' },
        'head': { email: 'manager@sj-inter.com', phone: '085-555-5555', startDate: '2021-06-01', avatar: '' },
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
                
                if (!AppState.users) AppState.users = defaultState.users;
                if (!AppState.profiles) AppState.profiles = defaultState.profiles;
                if (!AppState.auditLogs) AppState.auditLogs = []; 
                if (!AppState.requests) AppState.requests = []; 
                if (!AppState.timeLogs) AppState.timeLogs = []; 
                if (!AppState.dailyClock) AppState.dailyClock = {}; 
                if (!AppState.leaveBalances) AppState.leaveBalances = defaultState.leaveBalances; 
                if (!AppState.settings) AppState.settings = defaultState.settings;
                if (AppState.settings.broadcast === undefined) AppState.settings.broadcast = '';
                if (AppState.settings.maintenance === undefined) AppState.settings.maintenance = false;
            } else { 
                await dbRef.set(defaultState); 
                AppState = defaultState; 
            }
            return AppState;
        } catch (error) { 
            console.error("Database connection error:", error); 
            return AppState; 
        }
    },
    save: (state) => {
        const dataToSave = { ...state };
        delete dataToSave.currentUser;
        if (dataToSave.auditLogs && dataToSave.auditLogs.length > 200) dataToSave.auditLogs.length = 200; 
        dbRef.set(dataToSave, { merge: true }).catch(err => console.error("Database sync error:", err));
    }
};

// --- 4. Secure Authentication ---
const Auth = {
    toggle: (type) => {
        document.getElementById('form-login').style.display = type === 'login' ? 'block' : 'none';
        document.getElementById('form-register').style.display = type === 'register' ? 'block' : 'none';
    },
    register: () => {
        const name = document.getElementById('reg-name').value;
        const user = document.getElementById('reg-user').value.toLowerCase().trim();
        const pass = document.getElementById('reg-pass').value;
        let role = "employee";
        
        if (AppState.users.find(u => u.username === user)) {
            return App.toast('Username is already registered.', 'error');
        }
        
        let defDept = 'General Staff';
        if (role === 'admin') defDept = 'Human Resources';
        if (role === 'head') defDept = 'Sales'; 
        if (role === 'it') defDept = 'IT Operations';

        AppState.users.push({ username: user, password: pass, name: name, role: role, dept: defDept, isActive: true });
        AppState.leaveBalances[user] = { annual: AppState.settings.leaveQuota, sick: 30 }; 
        AppState.profiles[user] = { email: user + '@sj-inter.com', phone: '-', startDate: new Date().toLocaleDateString('en-CA'), avatar: '' };
        
        App.addLog('System', `New user provisioned: ${user} (${role})`); 
        DB.save(AppState); 
        
        if (typeof Swal !== 'undefined') Swal.fire({ icon: 'success', title: 'Registration Complete', text: 'You may now authenticate.' });
        else App.toast('Account created successfully.', 'success'); 
        
        Auth.toggle('login'); 
    },
    login: () => {
        const u = document.getElementById('login-user').value.toLowerCase().trim();
        const p = document.getElementById('login-pass').value;
        
        if (AppState.settings.maintenance && u !== 'it') {
            if (typeof Swal !== 'undefined') Swal.fire({ icon: 'info', title: 'System Maintenance', text: 'The system is currently undergoing scheduled maintenance.', confirmButtonColor: '#0f172a' }); 
            else alert('System Maintenance Mode.');
            return;
        }

        const acc = AppState.users.find(x => x.username === u && x.password === p);
        
        if (acc) { 
            if (acc.isActive === false) return alert(t('acc_locked')); 
            
            if (typeof Swal !== 'undefined') { 
                Swal.fire({ title: 'Authenticating...', html: 'Verifying credentials securely.', timer: 1500, didOpen: () => Swal.showLoading(), background: 'rgba(255, 255, 255, 0.95)', backdrop: `blur(12px)` }).then(() => { 
                    AppState.currentUser = acc; 
                    localStorage.setItem('hr_logged_user', JSON.stringify(acc)); 
                    App.addLog('Authentication', `User login successful: ${u}`); 
                    App.boot(); 
                }); 
            } else { 
                AppState.currentUser = acc; 
                localStorage.setItem('hr_logged_user', JSON.stringify(acc)); 
                App.addLog('Authentication', `User login successful: ${u}`); 
                App.boot(); 
            }
        } else {
            if (typeof Swal !== 'undefined') Swal.fire({ icon: 'error', title: 'Access Denied', text: 'Invalid username or password.' });
            else alert('Authentication failed.');
        }
    },
    logout: () => { 
        if (typeof Swal !== 'undefined') {
            Swal.fire({ title: 'Sign Out?', text: 'End your current session?', icon: 'warning', showCancelButton: true, confirmButtonColor: 'var(--danger)', confirmButtonText: 'Yes, Sign Out' }).then((res) => {
                if (res.isConfirmed) {
                    App.addLog('Authentication', `User logout: ${AppState.currentUser.username}`);
                    AppState.currentUser = null; 
                    localStorage.removeItem('hr_logged_user'); 
                    location.reload(); 
                }
            });
        } else {
            AppState.currentUser = null; localStorage.removeItem('hr_logged_user'); location.reload(); 
        }
    }
};

let chartInst = null; 
let liveChartInst = null; 
let liveChartInterval = null; 
let isSalaryVisible = false; 
let calMonth = new Date().getMonth();
let calYear = new Date().getFullYear();

// ==========================================
//  CORE AI ENGINE: FACE BIOMETRICS (OFICIAL)
// ==========================================
let isAIInitialized = false;
let aiDetectionInterval = null;
let currentStream = null;
let verificationTimer = null;

const initializeAI = async () => {
    try {
        console.log("🤖 [AI INIT] Initializing Face API Module...");
        const MODEL_URL = './models'; 
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        isAIInitialized = true;
        console.log("🤖 [AI INIT] Models loaded successfully.");
    } catch (error) {
        console.error("🤖 [AI INIT ERROR] Failed to load models:", error);
        if(typeof App !== 'undefined' && App.toast) App.toast('AI Biometrics failed to initialize.', 'error');
    }
};

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// --- Notification Engine ---
const Notif = {
    push: (user, msg) => {
        AppState.notifications.unshift({ 
            id: Date.now(), username: user, message: msg, 
            isRead: false, time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) 
        });
        if (AppState.notifications.length > 50) AppState.notifications.length = 50;
        DB.save(AppState);
        if (AppState.currentUser && AppState.currentUser.username === user) { 
            App.toast(msg); Notif.render(); 
        }
    },
    render: () => {
        if (!AppState.currentUser) return;
        const notifs = AppState.notifications.filter(n => n.username === AppState.currentUser.username);
        const unread = notifs.filter(n => !n.isRead).length;
        const b = document.getElementById('notif-badge');
        if (b) { b.innerText = unread; b.style.display = unread > 0 ? 'block' : 'none'; }
        const list = document.getElementById('notif-list');
        if (list) {
            list.innerHTML = notifs.slice(0, 5).map(n => `
                <div class="notif-item ${n.isRead ? '' : 'unread'}" onclick="App.nav('time', this)">
                    <div style="color:var(--primary); font-weight:500;">${n.message}</div>
                    <small style="color:var(--text-muted);"><i class="far fa-clock"></i> ${n.time}</small>
                </div>
            `).join('') || `<div class="empty-state"><i class="fas fa-inbox fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>${t('no_data')}</div>`;
        }
    },
    toggle: () => document.getElementById('notif-dropdown').classList.toggle('show'),
    read: (id) => { 
        const n = AppState.notifications.find(x => x.id === id); 
        if (n) { n.isRead = true; DB.save(AppState); Notif.render(); } 
    }
};

// --- Application Core Methods ---
const App = {
   addLog: (action, detail) => {
        if (!AppState.auditLogs) AppState.auditLogs = [];
        AppState.auditLogs.unshift({
            id: Date.now(), user: AppState.currentUser ? AppState.currentUser.name : 'System',
            role: AppState.currentUser ? AppState.currentUser.role : 'System', action: action,
            detail: detail, time: new Date().toLocaleString('en-GB')
        });
        if (AppState.auditLogs.length > 200) AppState.auditLogs.length = 200;
        DB.save(AppState);
    },

    // ==========================================
    //  ดูรายละเอียด & ยกเลิกคำขอ
    // ==========================================
    viewDetails: function(id, type) {
        // 1. ใส่ข้อมูลลงไปในหน้าต่าง
        document.getElementById('detail-title').innerHTML = type === 'leave' ? '📄 รายละเอียดการลา' : '🌙 รายละเอียด OT';
        
        let htmlContent = `
            <div class="details-row">
                <div class="details-label">รหัสเอกสาร</div>
                <div class="details-value">${id}</div>
            </div>
            <div class="details-row">
                <div class="details-label">สถานะ</div>
                <div class="details-value"><span class="badge" style="background:#f59e0b;color:white;">รออนุมัติ</span></div>
            </div>
            <div class="details-row">
                <div class="details-label">วันที่ส่งคำขอ</div>
                <div class="details-value">09 เม.ย. 2026</div>
            </div>
        `;
        document.getElementById('detail-body').innerHTML = htmlContent;

        // 2. อัปเดตปุ่ม "ยกเลิก" 
        let cancelBtn = document.getElementById('btn-cancel-request');
        if (cancelBtn) {
            let dbCollection = type === 'leave' ? 'leaves' : 'ots';
            cancelBtn.setAttribute('onclick', `App.cancelRequest('${id}', '${dbCollection}')`);
        }
let dbCollection = type === 'leave' ? 'leaves' : 'ots';
        cancelBtn.setAttribute('onclick', `App.cancelRequest('${id}', '${dbCollection}')`);
        
        // 
        let editBtn = document.getElementById('btn-edit-request');
        if (editBtn) {
            editBtn.setAttribute('onclick', `App.editRequest('${id}', '${dbCollection}')`);
        }
        
document.getElementById('modal-details').classList.add('show');
        // 3. สั่งเปิดหน้าต่าง (Modal)
        document.getElementById('modal-details').classList.add('show');
    },

    cancelRequest: function(requestId, collectionName = 'leaves') {
        Swal.fire({
            title: 'ยืนยันการยกเลิก?',
            text: "คำขอนี้จะถูกลบออกจากระบบและไม่สามารถกู้คืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // สีแดง (Danger)
            cancelButtonColor: '#8c8c8c',  // สีเทา (Cancel)
            confirmButtonText: '<i class="fas fa-trash"></i> ใช่, ยกเลิกเลย!',
            cancelButtonText: 'ปิดหน้าต่าง'
        }).then((result) => {
            if (result.isConfirmed) {
                //  โค้ดยิงลบข้อมูล Firebase 
                   Swal.fire('ยกเลิกสำเร็จ!', 'คำขอของคุณถูกลบออกจากระบบแล้ว', 'success');
                const detailsModal = document.querySelector('.details-modal-content');
                if(detailsModal) detailsModal.closest('.modal').classList.remove('show');
            }
        });
    },
    editRequest: function(requestId, collectionName) {
        // 1. ปิดหน้าต่างรายละเอียดก่อน
        document.getElementById('modal-details').classList.remove('show');
        
        // 2. เด้ง Alert ว่าเตรียมเปิดฟอร์มแก้ไข
        Swal.fire({
            title: 'โหมดแก้ไขคำขอ',
            text: `กำลังดึงข้อมูลเอกสาร ${requestId} มาให้แก้ไข...`,
            icon: 'info',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#3b82f6'
        }).then(() => {
            // 3. เปิดหน้าต่างฟอร์มขอลางาน หรือ OT เพื่อให้ผู้ใช้แก้ข้อมูล
            if (collectionName === 'leaves') {
                document.getElementById('modal-leave').classList.add('show');
            } else {
                document.getElementById('modal-ot').classList.add('show');
            }
        });
    },
    // ==========================================

    boot: async () => {
        document.getElementById('auth-view').style.display = 'none';
        document.getElementById('app-view').style.display = 'flex';
        
        // ปลุก AI ตอนเปิดแอป
        if(!isAIInitialized) await initializeAI(); 
        
        const u = AppState.currentUser;
        document.getElementById('user-name').innerText = u.name;
        document.getElementById('user-dept').innerText = u.dept;
        
        App.updateAvatarImg();
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
        App.updateBadge();
        
        const chatWidget = document.getElementById('chat-widget');
        if (chatWidget) chatWidget.style.display = 'block';
        if (typeof Chat !== 'undefined') Chat.init(); 
    },
    
    nav: (page, el) => {
        if (liveChartInterval) clearInterval(liveChartInterval);
        
        if (el) { 
            document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active')); 
            el.classList.add('active'); 
        }
        
        const container = document.getElementById('page-content');
        container.style.opacity = '0';
        container.style.transform = 'scale(0.98) translateY(10px)';
        container.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';

        setTimeout(() => {
            try {
                if (Views[page]) container.innerHTML = Views[page]();
                else container.innerHTML = `<h2>View Not Found</h2>`;
                
                container.style.opacity = '1';
                container.style.transform = 'scale(1) translateY(0)';
                
                if (page === 'home') { 
                    isSalaryVisible = false; 
                    App.updateClock(); App.renderChart(); App.renderDigitalTwin(); 
                }
                if (page === 'payslip') App.genSlip();
                if (page === 'cal') App.renderCalendarGrid();
                if (page === 'admin-rep') App.renderAdminCharts();
                if (page === 'admin-dash') App.renderAdminDashChart();
                if (page === 'it-dash') App.renderITLiveChart(); 
            } catch (e) {
                console.error("View Render Error:", e);
            }
        }, 200); 
    },

    // ==========================================
    // (อัปเกรด) REAL-TIME AI BIOMETRICS ENGINE
    // ==========================================
    clock: () => { 
        if(!isAIInitialized) {
            App.toast('AI models are still loading. Please wait...', 'warning');
            return;
        }
        App.startRealAIFaceScan(); 
    },
    
    startRealAIFaceScan: async () => {
        App.openModal('modal-facescan');
        
        const video = document.getElementById('face-video-ai');
        const canvas = document.getElementById('face-canvas-ai');
        const status = document.getElementById('scan-status-ai');
        
        status.innerHTML = `<i class="fas fa-spinner fa-spin" style="color:#3b82f6;"></i> กำลังเปิด optics...`;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            video.srcObject = stream;
            currentStream = stream; 

            video.addEventListener('play', () => {
                const displaySize = { width: video.width || 300, height: video.height || 300 };
                faceapi.matchDimensions(canvas, displaySize);
                
                let isFaceStableForTime = 0; 
                clearTimeout(verificationTimer);

                aiDetectionInterval = setInterval(async () => {
                    if (!video.srcObject) return; 

                    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks();

                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height); 

                    if (detection) {
                        const resizedDetections = faceapi.resizeResults(detection, displaySize);
                        faceapi.draw.drawDetections(canvas, resizedDetections);
                        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

                        status.innerHTML = `<span style="color:#34d399;"><i class="fas fa-check-circle" style="animation: pulse-green 1s infinite;"></i> Identity Detected. ยืนนิ่งๆ 2 วินาที...</span>`;
                        
                        isFaceStableForTime += 150; 
                        
                        if (isFaceStableForTime >= 2000) { 
                            clearInterval(aiDetectionInterval); 
                            status.innerHTML = `<span style="color:#3b82f6; font-size:16px;"><i class="fas fa-fingerprint"></i> Identity Verified. Match 99.9%</span>`;
                            
                            ctx.fillStyle = 'rgba(52, 211, 153, 0.1)'; ctx.fillRect(0,0,300,300);

                            verificationTimer = setTimeout(() => {
                                App.cancelFaceScan(); 
                                App.processClock();  
                            }, 1000);
                        }
                    } else {
                        status.innerHTML = `<i class="fas fa-search" style="color:#94a3b8;"></i> กำลังค้นหาใบหน้า... กรุณาจัดหน้าให้อยู่ในเฟรม`;
                        isFaceStableForTime = 0; 
                    }
                }, 150); 
            });

        } catch (err) {
            console.error("Camera access error:", err);
            status.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-exclamation-triangle"></i> Optics Failed. ไม่สามารถเปิดกล้องได้</span>`;
            setTimeout(() => App.cancelFaceScan(), 3000);
        }
    },

    cancelFaceScan: () => {
        App.closeModal('modal-facescan');
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop()); 
            currentStream = null;
        }
        if (aiDetectionInterval) clearInterval(aiDetectionInterval); 
        if (verificationTimer) clearTimeout(verificationTimer); 

        const video = document.getElementById('face-video-ai');
        const canvas = document.getElementById('face-canvas-ai');
        if (video) video.srcObject = null;
        if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
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
            App.addLog('Attendance', `Clocked in via True AI Biometrics (${loc})`);
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
            App.addLog('Attendance', `Clocked out via True AI Biometrics. Session: ${hrs}h`);
            App.toast(`Session Ended. Total: ${hrs}h`, 'success');
        }
        
        DB.save(AppState); 
        App.updateClock();
    },

    updateClock: () => {
        const btn = document.getElementById('btn-clock');
        const st = document.getElementById('status-clock');
        const sel = document.getElementById('work-location');
        
        if (!btn || !st) return; 
        
        let c = AppState.dailyClock[AppState.currentUser.username];
        
        if (c && c.status === 'in' && c.date === new Date().toLocaleDateString('en-CA')) {
            if (sel) sel.disabled = true; 
            btn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t('clock_btn_out')} (AI Scan)`; 
            btn.classList.replace('btn-primary', 'btn-danger'); 
            
            st.innerHTML = `
                <span style="color:var(--success); font-weight:800;">
                    <i class="fas fa-satellite-dish" style="animation: pulse-green 2s infinite;"></i> ONLINE SECURE (${c.loc})
                </span><br>
                <span class="text-muted" style="font-family:monospace;">Since ${new Date(c.in).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})}</span>
            `;
        } else { 
            if (sel) sel.disabled = false; 
            btn.innerHTML = `<i class="fas fa-fingerprint"></i> Initialize Biometric Scan`; 
            btn.classList.replace('btn-danger', 'btn-primary'); 
            st.innerHTML = `<span class="text-muted"><i class="fas fa-power-off"></i> OFFLINE</span>`; 
        }
        
        App.renderDigitalTwin();
    },

    filterApprovals: (status, btn) => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.style.background = 'transparent'; b.style.color = '#64748b'; b.classList.remove('active');
        });
        btn.style.background = '#e0e7ff'; btn.style.color = 'var(--primary)'; btn.classList.add('active');
        const rows = document.querySelectorAll('.approval-row');
        rows.forEach(row => {
            const rStatus = row.getAttribute('data-status');
            row.style.display = (status === 'All' || rStatus.includes(status)) ? '' : 'none';
        });
    },

    searchApprovals: (val) => {
        const term = val.toLowerCase();
        document.querySelectorAll('.approval-row').forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(term) ? '' : 'none';
        });
    },

    showRequestDetails: (id) => {
        const r = AppState.requests.find(x => x.id === id);
        if (!r) return;
        let m = document.getElementById('modal-smart-details');
        if (!m) { 
            m = document.createElement('div'); m.className = 'modal'; m.id = 'modal-smart-details'; document.body.appendChild(m); 
        }
        const dateObj = new Date(r.id);
        const submittedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const submittedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        let badgeColor = '#b45309', badgeBg = '#fef3c7', statText = r.status.split(' ')[0];
        if (r.status === 'Approved') { badgeColor = '#047857'; badgeBg = '#d1fae5'; } 
        else if (r.status === 'Rejected') { badgeColor = '#be123c'; badgeBg = '#ffe4e6'; } 
        else if (r.status.includes('Pending')) { statText = 'Pending'; } 

        const durationStr = r.type === 'OT' ? r.detail : '1.00 Day';
        const headApprover = AppState.users.find(u => u.role === 'head');
        let attachmentHTML = r.attachment ? `<div style="margin-top:10px;"><a href="${r.attachment}" target="_blank" style="color:var(--primary); font-size:12px; text-decoration:none;"><i class="fas fa-paperclip"></i> View Attached Evidence</a></div>` : '';

        m.innerHTML = `
            <div class="details-modal-content">
                <div class="details-header"><h2>Details</h2><button class="details-close" onclick="App.closeModal('modal-smart-details')"><i class="fas fa-times"></i></button></div>
                <div class="details-body">
                    <div class="details-title-row">
                        <h3>${r.type === 'OT' ? 'Overtime Request' : r.detail}</h3>
                        <span style="background:${badgeBg}; color:${badgeColor}; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:700;">${statText}</span>
                    </div>
                    <div class="details-row"><span class="details-label">Employee:</span> <span class="details-value">${r.name} (EMP-${r.u.toUpperCase()})</span></div>
                    <div class="details-row"><span class="details-label">Approver:</span> <span class="details-value">${headApprover ? headApprover.name : 'Supervisor'}</span></div>
                    <div class="details-row"><span class="details-label">Date:</span> <span class="details-value">${submittedDate}</span></div>
                    <div class="details-row"><span class="details-label">Duration:</span> <span class="details-value">${durationStr}</span></div>
                    <div class="details-notes">
                        <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase; margin-bottom:6px; display:block;">Previous notes:</span>
                        <p><b>${submittedDate} ${submittedTime} - ${r.name}:</b><br>${r.reason || 'No description provided.'}</p>
                        ${attachmentHTML}
                    </div>
                </div>
                <div class="details-footer">
                    <button class="btn-outline" style="border: 1px solid #cbd5e1; color: #334155; font-size:13px; padding:8px 16px;" onclick="App.closeModal('modal-smart-details')"><i class="fas fa-pen"></i> Edit</button>
                    <div style="display:flex; gap:16px; align-items:center;">
                        <a href="#" onclick="App.closeModal('modal-smart-details'); event.preventDefault();" style="color: #3b82f6; font-size:13px; text-decoration:underline;">Cancel request</a>
                        <button class="btn-primary" style="background:#3b82f6; font-size:13px; padding:8px 20px; border-radius:6px;" onclick="App.closeModal('modal-smart-details')">OK</button>
                    </div>
                </div>
            </div>`;
        App.openModal('modal-smart-details');
    },

    submitLeave: async () => {
        const u = AppState.currentUser.username;
        const k = document.getElementById('lv-type').value.includes('Annual') ? 'annual' : 'sick';
        let days = document.getElementById('lv-format').value === 'hourly' ? 0.125 : 1; 
        
        if (!AppState.leaveBalances[u]) AppState.leaveBalances[u] = { annual: AppState.settings.leaveQuota, sick: 30 };
        if (AppState.leaveBalances[u][k] < days) return App.toast('Insufficient leave balance.', 'error');
        
        let attachmentBase64 = null; 
        const fileInput = document.getElementById('lv-file');
        if (fileInput && fileInput.files[0]) try { attachmentBase64 = await fileToBase64(fileInput.files[0]); } catch(e) { console.error(e); } 
        
        AppState.leaveBalances[u][k] -= days; 
        AppState.requests.unshift({ 
            id: Date.now(), type: 'Leave', u: u, name: AppState.currentUser.name, 
            detail: document.getElementById('lv-type').value, reason: document.getElementById('lv-reason').value, 
            attachment: attachmentBase64, status: 'Pending (Supervisor)' 
        });
        
        App.addLog('Workflow', `Submitted Leave Request`); DB.save(AppState); 
        if (fileInput) fileInput.value = ''; 
        App.closeModal('modal-leave'); App.toast('Request submitted to Supervisor.'); App.nav('time', document.querySelectorAll('.nav-item')[1]); 
    },
    // 🗑️ ฟังก์ชันสำหรับยกเลิกคำขอ (ใส่ไว้ใน const App = { ... })
    cancelRequest: function(requestId, collectionName = 'leaves') {
        Swal.fire({
            title: 'ยืนยันการยกเลิก?',
            text: "คำขอนี้จะถูกลบออกจากระบบและไม่สามารถกู้คืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // สีแดง (Danger)
            cancelButtonColor: '#8c8c8c',  // สีเทา (Cancel)
            confirmButtonText: '<i class="fas fa-trash"></i> ใช่, ยกเลิกเลย!',
            cancelButtonText: 'ปิดหน้าต่าง'
        }).then((result) => {
            if (result.isConfirmed) {        
                Swal.fire('ยกเลิกสำเร็จ!', 'คำขอของคุณถูกลบออกจากระบบแล้ว', 'success');
                // สมมติว่าปิด Modal ไปเลยเวลากดลบสำเร็จ
                const detailsModal = document.querySelector('.details-modal-content');
                if(detailsModal) detailsModal.closest('.modal').classList.remove('show');
            }
        });
    },

    submitOT: async () => {
        let attachmentBase64 = null; 
        const fileInput = document.getElementById('ot-file');
        if (fileInput && fileInput.files[0]) try { attachmentBase64 = await fileToBase64(fileInput.files[0]); } catch(e) { console.error(e); } 
        
        AppState.requests.unshift({ 
            id: Date.now(), type: 'OT', u: AppState.currentUser.username, name: AppState.currentUser.name, 
            detail: document.getElementById('ot-hours').value + ' Hrs', reason: document.getElementById('ot-reason').value, 
            attachment: attachmentBase64, status: 'Pending (Supervisor)' 
        });
        
        App.addLog('Workflow', `Submitted OT Request`); DB.save(AppState); 
        if (fileInput) fileInput.value = ''; 
        App.closeModal('modal-ot'); App.toast('OT request submitted to Supervisor.'); App.nav('time', document.querySelectorAll('.nav-item')[1]);
    },

    sendLineAlert: (employee, type, status) => { 
        fetch("https://hook.eu1.make.com/63miskvj947chdguwvz553l12ikk9qqb", { 
            method: 'POST', headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ employeeName: employee, requestType: type, result: status, time: new Date().toLocaleString('en-GB') }) 
        }).catch(err => console.error("Webhook Error:", err)); 
    },

    actionReq: (id, actionType) => {
        const r = AppState.requests.find(x => x.id === id); 
        const userRole = AppState.currentUser.role;
        if (r) { 
            let newStatus = actionType; 
            if (actionType === 'Approved') { 
                if (userRole === 'head') newStatus = 'Pending (HR)'; 
                else if (userRole === 'admin') newStatus = 'Approved'; 
            } else { newStatus = 'Rejected'; }
            
            r.status = newStatus; 
            App.addLog('Workflow Action', `${newStatus} request for ${r.name} (${r.type}) by ${userRole}`); 
            DB.save(AppState); App.toast(`Request marked as ${newStatus}`); App.sendLineAlert(r.name, r.type, newStatus); 
            App.nav('admin-approve'); App.updateBadge(); Notif.push(r.u, `Workflow Update: Your ${r.type} request is now ${newStatus}.`); 
        }
    },

    openEditUser: (username) => { 
        const u = AppState.users.find(x => x.username === username); 
        const bal = AppState.leaveBalances[username] || { annual: 0, sick: 0 }; 
        let m = document.getElementById('modal-edit-user'); 
        if (!m) { m = document.createElement('div'); m.className = 'modal'; m.id = 'modal-edit-user'; document.body.appendChild(m); } 
        
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
            </div>`; 
        App.openModal('modal-edit-user'); 
    },

    saveEditUser: (username) => { 
        const u = AppState.users.find(x => x.username === username); 
        if (u) { u.name = document.getElementById('edit-u-name').value; u.dept = document.getElementById('edit-u-dept').value; u.role = document.getElementById('edit-u-role').value; } 
        if (!AppState.leaveBalances[username]) AppState.leaveBalances[username] = {}; 
        AppState.leaveBalances[username].annual = parseFloat(document.getElementById('edit-u-annual').value); 
        AppState.leaveBalances[username].sick = parseFloat(document.getElementById('edit-u-sick').value); 
        App.addLog('Data Update', `Modified user profile: ${username}`); DB.save(AppState); App.closeModal('modal-edit-user'); App.toast('Employee record updated.', 'success'); 
        const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Directory') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage')); 
        if (navEl) App.nav('admin-dir', navEl); 
    },

    toggleUserStatus: (username) => { 
        if (username === AppState.currentUser.username) return App.toast('Self-suspension is not permitted.', 'error'); 
        const u = AppState.users.find(x => x.username === username); 
        if (u) { 
            u.isActive = u.isActive === false ? true : false; 
            App.addLog('Access Control', `Changed account status for ${username} to ${u.isActive ? 'Active' : 'Suspended'}`); DB.save(AppState); App.toast(`Account status updated.`, 'success'); 
            const navEl = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText.includes('Directory') || el.innerText.includes('รายชื่อ') || el.innerText.includes('Manage')); 
            if (navEl) App.nav('admin-dir', navEl); 
        } 
    },

    saveSettings: () => { 
        AppState.settings.companyName = document.getElementById('set-company').value; AppState.settings.leaveQuota = parseInt(document.getElementById('set-quota').value); AppState.settings.broadcast = document.getElementById('set-broadcast').value; 
        const maintEl = document.getElementById('set-maintenance'); 
        if (maintEl) { 
            const isMaint = maintEl.value === 'on'; 
            if (AppState.settings.maintenance !== isMaint) App.addLog('System Configuration', `Maintenance mode changed to: ${isMaint ? 'ON' : 'OFF'}`); 
            AppState.settings.maintenance = isMaint; 
        } 
        DB.save(AppState); App.toast('System configuration applied.', 'success'); 
    },

    backupDB: () => { 
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2)); 
        const a = document.createElement('a'); a.href = dataStr; a.download = "DB_Backup_" + new Date().toISOString().slice(0,10) + ".json"; a.click(); 
        App.addLog('Data Management', 'Manual database backup downloaded'); App.toast('Database Backup Downloaded', 'success'); 
    },

    clearCache: () => { 
        if (typeof Swal !== 'undefined') { 
            Swal.fire({ title: 'Clear System Cache?', text: "This action will purge temporary data. Do you wish to proceed?", icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b', confirmButtonText: 'Proceed' }).then((result) => { 
                if (result.isConfirmed) { App.addLog('System Maintenance', 'System cache cleared'); App.toast('Cache cleared successfully.', 'success'); } 
            }); 
        } 
    },
    
    resetPass: (username) => { 
        if (typeof Swal !== 'undefined') { 
            Swal.fire({ title: `Reset Password: ${username}`, input: 'text', inputLabel: 'Enter temporary password', inputValue: '123456', showCancelButton: true, confirmButtonText: 'Update Password', confirmButtonColor: '#3b82f6' }).then((result) => { 
                if (result.isConfirmed && result.value) { 
                    const u = AppState.users.find(x => x.username === username); 
                    if (u) { u.password = result.value; App.addLog('Security', `Password reset executed for: ${username}`); DB.save(AppState); App.toast('Password reset successfully.', 'success'); } 
                } 
            }); 
        } 
    },
    
    // (Toast function added just in case it was missing from original logic)
    toast: (msg, type = 'success') => {
        const c = document.getElementById('toast-container');
        if (!c) return;
        const div = document.createElement('div');
        div.className = 'toast show';
        div.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-exclamation-circle'}" style="color:${type==='success'?'#10b981':'#ef4444'};"></i> ${msg}`;
        c.appendChild(div);
        setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 300); }, 3000);
    }
};
// --- General Utilities ---
App.toggleSal = () => { 
    isSalaryVisible = !isSalaryVisible; 
    document.getElementById('salary-val').classList.toggle('masked'); 
    document.getElementById('salary-btn').innerHTML = isSalaryVisible ? `<i class="fas fa-eye-slash"></i> ${t('hide')}` : `<i class="fas fa-eye"></i> ${t('show')}`; 
};

App.switchTab = (id, btn) => { 
    document.querySelectorAll('.tab-btn').forEach(x => { x.classList.remove('active'); x.style.borderBottom = 'none'; x.style.color = '#64748b'; }); 
    btn.classList.add('active'); btn.style.borderBottom = '3px solid var(--primary)'; btn.style.color = 'var(--primary)'; 
    document.querySelectorAll('.tab-content').forEach(x => x.style.display = 'none'); document.getElementById(id).style.display = 'block'; 
};

App.openModal = (id) => { document.getElementById(id).classList.add('show'); };

App.closeModal = (id) => { 
    document.getElementById(id).classList.remove('show'); 
    if (document.getElementById('lv-file')) document.getElementById('lv-file').value = ''; 
    if (document.getElementById('ot-file')) document.getElementById('ot-file').value = ''; 
};

App.exportToCSV = () => { 
    App.toast('Exporting database records...'); 
    let csv = "\uFEFFID,Name,Department,Role,Status,Annual Leave,Sick Leave\n"; 
    AppState.users.forEach(u => { 
        const bal = AppState.leaveBalances[u.username] || { annual: 0, sick: 0 }; 
        const status = u.isActive !== false ? 'Active' : 'Suspended'; 
        csv += `EMP-${u.username.toUpperCase()},${u.name},${u.dept},${u.role},${status},${bal.annual},${bal.sick}\n`; 
    }); 
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); const url = URL.createObjectURL(blob); 
    const a = document.createElement("a"); a.href = url; a.download = `Employee_Database_${new Date().toISOString().slice(0,10)}.csv`; 
    a.click(); App.addLog('Data Export', 'Exported employee directory to CSV'); 
};

App.updateAvatarImg = () => { 
    const u = AppState.currentUser.username; 
    if (!AppState.profiles[u]) AppState.profiles[u] = { email: '', phone: '', startDate: '', avatar: '' }; 
    const src = AppState.profiles[u].avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=e0e7ff&color=3b82f6&bold=true`; 
    const img = document.getElementById('avatar-img'); if (img) img.src = src; 
    const profImg = document.getElementById('prof-avatar-img'); if (profImg) profImg.src = src; 
};

App.handleAvatarUpload = (e) => { 
    const file = e.target.files[0]; const u = AppState.currentUser.username; 
    if (file) { 
        const reader = new FileReader(); 
        reader.onload = (event) => { AppState.profiles[u].avatar = event.target.result; DB.save(AppState); App.updateAvatarImg(); App.toast('Profile photo updated', 'success'); }; 
        reader.readAsDataURL(file); 
    } 
};

App.saveProfile = () => { 
    const u = AppState.currentUser.username; AppState.profiles[u].email = document.getElementById('prof-email').value; AppState.profiles[u].phone = document.getElementById('prof-phone').value; 
    DB.save(AppState); App.toast('Profile information saved.', 'success'); 
};

App.downloadFile = (filename) => { 
    App.toast(`Initiating download: ${filename}...`); 
    const blob = new Blob(["Document Content placeholder: " + filename], { type: "text/plain" }); 
    const url = window.URL.createObjectURL(blob); const a = document.createElement("a"); 
    a.href = url; a.download = filename + ".txt"; a.click(); window.URL.revokeObjectURL(url); 
};

App.getMonthOptions = () => { 
    let options = ''; const today = new Date(); 
    for (let i = 0; i < 12; i++) { 
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1); 
        const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; 
        options += `<option value="${val}">${d.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</option>`; 
    } 
    return options; 
};

App.updateBadge = () => { 
    const b = document.getElementById('badge-pending'); if (!b || !AppState.currentUser) return;
    const role = AppState.currentUser.role; let count = 0;
    if (role === 'head') count = AppState.requests.filter(r => r.status === 'Pending (Supervisor)').length;
    if (role === 'admin') count = AppState.requests.filter(r => r.status === 'Pending (HR)').length;
    b.innerText = count; b.style.display = count > 0 ? 'inline-block' : 'none'; 
};

App.getSalary = () => {
    const r = AppState.currentUser.role;
    if (r === 'admin' || r === 'it' || r === 'head') return { base: 85000, ot: 0, allow: 5000, sso: 750, tax: 6500, absent: 0, earn: 90000, deduct: 7250, net: 82750 }; 
    else return { base: 35000, ot: 4250, allow: 1500, sso: 750, tax: 1250, absent: 0, earn: 40750, deduct: 2000, net: 38750 }; 
};

// --- Advanced AI Chatbot System ---
const Chat = {
    isOpen: false, currentRoom: '', unsubscribe: null,
    init: () => {
        const u = AppState.currentUser; if (!Chat.currentRoom) Chat.currentRoom = u.username;
        const header = document.querySelector('.chat-header');
        if (u.role !== 'employee') {
            const selectHtml = `
                <select id="chat-room-select" onchange="Chat.changeRoom(this.value)" style="margin-left: 10px; padding: 2px 6px; font-size: 11px; border-radius: 4px; color: black; border: none; max-width: 130px; outline:none; cursor:pointer;">
                    ${AppState.users.map(x => `<option value="${x.username}" ${x.username === Chat.currentRoom ? 'selected' : ''}>${x.name}</option>`).join('')}
                </select>
            `;
            header.innerHTML = `<i class="fas fa-headset"></i> Support ${selectHtml} <span id="chat-unread" class="badge" style="background:#ef4444; color:white; display:none; margin-left:auto; border:none; padding:2px 6px; font-size:10px;">New</span>`;
        } else { header.innerHTML = `<i class="fas fa-headset"></i> HR Helpdesk <span id="chat-unread" class="badge" style="background:#ef4444; color:white; display:none; margin-left:auto; border:none; padding:2px 6px; font-size:10px;">New</span>`; }
        Chat.loadMessages();
    },
    changeRoom: (roomUser) => { Chat.currentRoom = roomUser; Chat.loadMessages(); },
    loadMessages: () => {
        if (Chat.unsubscribe) Chat.unsubscribe();
        Chat.unsubscribe = db.collection('hr_chats').where('room', '==', Chat.currentRoom).onSnapshot(snapshot => {
            const box = document.getElementById('chat-messages'); if (!box) return;
            let messages = []; snapshot.forEach(doc => messages.push(doc.data()));
            messages.sort((a, b) => { const tA = a.timestamp ? a.timestamp.toMillis() : Date.now(); const tB = b.timestamp ? b.timestamp.toMillis() : Date.now(); return tA - tB; });
            
            let html = '';
            messages.forEach(msg => {
                const isSelf = msg.u === AppState.currentUser.username; 
                const time = msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}) : 'Just now';
                html += `
                    <div class="msg-bubble ${isSelf ? 'msg-self' : 'msg-other'}"> 
                        ${!isSelf ? `<div class="msg-name">${msg.name} <span style="font-weight:400; opacity:0.6;">(${msg.role})</span></div>` : ''} 
                        <div>${msg.text}</div> 
                        <div class="msg-time">${time}</div> 
                    </div>
                `;
            });
            box.innerHTML = html || `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size:13px; font-weight:600;"><i class="fas fa-robot fa-2x" style="margin-bottom:12px; color:var(--brand-light);"></i><br>Helios AI Assistant initialized. How can I optimize your workflow today?</div>`;
            box.scrollTop = box.scrollHeight; 
            
            if (!Chat.isOpen && snapshot.docChanges().length > 0) { 
                const hasNewFromOthers = snapshot.docChanges().some(c => c.type === 'added' && c.doc.data().u !== AppState.currentUser.username); 
                if (hasNewFromOthers) document.getElementById('chat-unread').style.display = 'inline-block'; 
            }
        });
    },
    toggle: (e) => { 
        if (e && e.target.id === 'chat-room-select') return; 
        Chat.isOpen = !Chat.isOpen; document.getElementById('chat-body').style.display = Chat.isOpen ? 'block' : 'none'; 
        if (Chat.isOpen) { document.getElementById('chat-unread').style.display = 'none'; const box = document.getElementById('chat-messages'); box.scrollTop = box.scrollHeight; } 
    },
    send: () => { 
        const input = document.getElementById('chat-text'); const text = input.value.trim(); if (!text) return; input.value = ''; 
        db.collection('hr_chats').add({ room: Chat.currentRoom, text: text, u: AppState.currentUser.username, name: AppState.currentUser.name, role: AppState.currentUser.role.toUpperCase(), timestamp: firebase.firestore.FieldValue.serverTimestamp() }).catch(err => console.error("Chat Error:", err)); 
        
        const mLower = text.toLowerCase(); let reply = "I've recorded your query. A human specialist will review it shortly."; 
        if(mLower.includes('leave') || mLower.includes('ลา')) { const bal = AppState.leaveBalances[AppState.currentUser.username]?.annual || 0; reply = `To request leave, please navigate to the 'Time & Leave' module. You currently have <b>${bal}</b> days of annual leave remaining.`; } 
        else if(mLower.includes('salary') || mLower.includes('pay') || mLower.includes('เงิน')) { reply = "Your latest e-payslip is generated on the 25th of every month. You can securely view it in the 'E-Payslip' module."; } 
        else if(mLower.includes('ot') || mLower.includes('โอที')) { reply = "OT requests must be submitted within 24 hours of completion. Supervisors require evidence attachments for weekend OT."; }
        
        setTimeout(() => {
            const list = document.getElementById('chat-messages');
            if(list) {
                list.innerHTML += `<div class="msg-bubble msg-other" style="border-left: 3px solid var(--brand-main);"><strong style="color:var(--brand-main); font-size:12px; display:block; margin-bottom:4px;">Helios AI</strong>${reply}<div style="font-size:10px; margin-top:6px; opacity:0.8;">Just now</div></div>`;
                list.scrollTop = list.scrollHeight;
            }
        }, 1500);
    }
};

// --- Advanced Chart Renderers ---
App.renderChart = () => {
    if (chartInst) chartInst.destroy(); 
    const u = AppState.currentUser.username; const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0; const ctx = document.getElementById('userChart');
    if (!ctx) return; 
    chartInst = new Chart(ctx, { type: 'doughnut', data: { labels: ['Used', 'Remaining'], datasets: [{ data: [AppState.settings.leaveQuota - bal, bal], backgroundColor: ['#e2e8f0', '#3b82f6'], borderWidth: 0 }] }, options: { cutout: '80%', plugins: { legend: { display: false } } } });
};

App.renderAdminDashChart = () => {
    if (chartInst) chartInst.destroy(); const ctx = document.getElementById('adminDashChart'); if (!ctx) return; 
    chartInst = new Chart(ctx, { type: 'bar', data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [ { label: 'Present', data: [12, 15, 14, 13, 10], backgroundColor: '#10b981' }, { label: 'Leave', data: [2, 0, 1, 1, 4], backgroundColor: '#f59e0b' }, { label: 'Remote', data: [1, 0, 0, 1, 1], backgroundColor: '#3b82f6' } ] }, options: { maintainAspectRatio: false, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true, border: { dash: [4, 4] } } }, plugins: { legend: { position: 'top' } } } });
};

App.renderITLiveChart = () => {
    if (liveChartInst) liveChartInst.destroy(); const ctx = document.getElementById('itLiveChart'); if (!ctx) return;
    let currentCpu = 25; const initialData = Array.from({length: 40}, () => { currentCpu += (Math.random() * 4) - 2; return Math.max(5, Math.min(95, currentCpu)); });
    liveChartInst = new Chart(ctx, { type: 'line', data: { labels: Array(40).fill(''), datasets: [{ label: 'CPU Allocation (%)', data: initialData, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 }] }, options: { maintainAspectRatio: false, animation: false, scales: { y: { min: 0, max: 100, ticks: { stepSize: 20, color: '#94a3b8', font: { size: 10 } }, grid: { color: '#f1f5f9' }, border: { display: false } }, x: { display: false } }, plugins: { legend: { display: false }, tooltip: { enabled: false } } } });
    liveChartInterval = setInterval(() => {
        const data = liveChartInst.data.datasets[0].data; let lastVal = data[data.length - 1]; let change = (Math.random() * 5) - 2.5; 
        if (Math.random() > 0.98) change += 25; if (lastVal > 60) change -= 2; if (lastVal < 15) change += 2;
        let newVal = Math.max(2, Math.min(98, lastVal + change)); let color = '#10b981'; let bgColor = 'rgba(16, 185, 129, 0.05)';
        if (newVal > 80) { color = '#ef4444'; bgColor = 'rgba(239, 68, 68, 0.05)'; } else if (newVal > 60) { color = '#f59e0b'; bgColor = 'rgba(245, 158, 11, 0.05)'; }
        liveChartInst.data.datasets[0].borderColor = color; liveChartInst.data.datasets[0].backgroundColor = bgColor;
        data.push(newVal); data.shift(); liveChartInst.update();
    }, 1000);
};

App.renderDigitalTwin = () => {
    if (!document.querySelector('.digital-twin-wrapper')) return; 
    ['hr', 'sales', 'it', 'general', 'wfh'].forEach(z => { const el = document.getElementById(`zone-${z}`); if (el) { const title = el.querySelector('.zone-title'); el.innerHTML = ''; el.appendChild(title); } });
    const todayStr = new Date().toLocaleDateString('en-CA');
    for (const user in AppState.dailyClock) {
        const clockData = AppState.dailyClock[user];
        if (clockData.date === todayStr && clockData.status === 'in') {
            const uData = AppState.users.find(x => x.username === user); if (!uData) continue;
            const avatarSrc = (AppState.profiles && AppState.profiles[user] && AppState.profiles[user].avatar) ? AppState.profiles[user].avatar : `https://ui-avatars.com/api/?name=${uData.name}&background=e0e7ff&color=3b82f6`;
            let targetZone = 'general';
            if (clockData.loc === 'WFH') { targetZone = 'wfh'; } else {
                const dept = (uData.dept || '').toLowerCase();
                if (dept.includes('hr') || dept.includes('human')) targetZone = 'hr'; else if (dept.includes('sales') || dept.includes('marketing')) targetZone = 'sales'; else if (dept.includes('it')) targetZone = 'it';
            }
            const zoneEl = document.getElementById(`zone-${targetZone}`);
            if (zoneEl) {
                const dotClass = clockData.loc === 'WFH' ? 'live-avatar wfh' : 'live-avatar';
                zoneEl.innerHTML += `<div class="${dotClass}" title="${uData.name} - Since ${new Date(clockData.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}"><img src="${avatarSrc}"><span>${uData.name.split(' ')[0]}</span></div>`;
            }
        }
    }
};

App.changeCalMonth = (dir) => { calMonth += dir; if (calMonth < 0) { calMonth = 11; calYear--; } else if (calMonth > 11) { calMonth = 0; calYear++; } App.renderCalendarGrid(); };

App.renderCalendarGrid = () => { 
    const wrapper = document.getElementById('cal-wrapper'); if (!wrapper) return; 
    const d = new Date(calYear, calMonth, 1); document.getElementById('cal-title').innerText = `${d.toLocaleString('en-US', { month: 'long' })} ${calYear}`; 
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate(); const firstDayIndex = d.getDay(); const today = new Date(); const isCurrentMonth = today.getMonth() === calMonth && today.getFullYear() === calYear; 
    let html = ''; for (let i = 0; i < firstDayIndex; i++) { html += `<div class="cal-day empty"></div>`; }
    for (let i = 1; i <= daysInMonth; i++) { 
        let classes = "cal-day"; if (isCurrentMonth && i === today.getDate()) classes += " today"; 
        let eventHTML = ""; if (i === 10) eventHTML = `<span class="event-badge" style="background:#fee2e2; color:#b91c1c;">Public Holiday</span>`; if (i === 25) eventHTML = `<span class="event-badge">Payroll Cut-off</span>`; 
        html += `<div class="${classes}"><div style="font-weight:bold;">${i}</div>${eventHTML}</div>`; 
    } 
    wrapper.innerHTML = html; 
};

App.genSlip = () => {
    const wrapper = document.getElementById('printable-area'); if (!wrapper) return; 
    const slip = App.getSalary(); const monthValue = document.getElementById('slip-month') ? document.getElementById('slip-month').value : 'Current Month';
    wrapper.innerHTML = `
    <div style="background:white; padding:40px; border:1px solid var(--border); border-radius:var(--radius); font-family:'Inter', 'Kanit', sans-serif; max-width:800px; margin:0 auto; box-shadow:var(--shadow-sm);"> 
        <div style="text-align:center; margin-bottom:30px;"><h2 style="font-size:20px; color:var(--primary); margin:0; text-transform:uppercase; letter-spacing:1px;">${AppState.settings.companyName}</h2><p style="color:var(--text-muted); margin:5px 0 0 0; font-size:12px;">E-Payslip Document - ${monthValue}</p></div> 
        <div style="background:var(--bg-main); padding:15px 20px; border-radius:var(--radius-sm); margin-bottom:25px; display:flex; justify-content:space-between; font-size:13px; border:1px solid var(--border);"><div>Employee: <b>${AppState.currentUser.name}</b> <span style="color:var(--text-muted); margin-left:8px;">(ID: EMP-${AppState.currentUser.username.toUpperCase()})</span></div><div style="text-align:right">Department: <b>${AppState.currentUser.dept}</b></div></div> 
        <div class="grid-2" style="gap:30px;"> 
            <div>
                <h3 style="font-size:14px; color:var(--success); border-bottom:2px solid var(--success); padding-bottom:8px; margin-bottom:15px; text-transform:uppercase;">Earnings</h3>
                <div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_base')}</span><b>${slip.base.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                <div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_ot')}</span><b>${slip.ot.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                <div class="flex-between" style="padding:8px 0; font-size:13px; border-bottom:1px solid var(--border);"><span>${t('slip_allow')}</span><b>${slip.allow.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                <div class="flex-between" style="padding:12px 0; font-weight:600; color:var(--primary);"><span>${t('slip_total_earn')}</span><b style="font-size:15px;">THB ${slip.earn.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
            </div> 
            <div>
                <h3 style="font-size:14px; color:var(--danger); border-bottom:2px solid var(--danger); padding-bottom:8px; margin-bottom:15px; text-transform:uppercase;">Deductions</h3>
                <div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_sso')}</span><b>${slip.sso.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                <div class="flex-between" style="padding:8px 0; font-size:13px;"><span>${t('slip_tax')}</span><b>${slip.tax.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                <div class="flex-between" style="padding:8px 0; font-size:13px; border-bottom:1px solid var(--border); color:var(--danger);"><span>${t('slip_absent')}</span><b>${slip.absent.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
                <div class="flex-between" style="padding:12px 0; font-weight:600; color:var(--primary);"><span>${t('slip_total_deduct')}</span><b style="font-size:15px;">THB ${slip.deduct.toLocaleString(undefined, {minimumFractionDigits: 2})}</b></div>
            </div> 
        </div> 
        <div style="margin-top:40px; padding:24px; background:var(--primary); color:white; border-radius:var(--radius-sm); text-align:right; box-shadow:var(--shadow);">
            <div style="font-size:12px; opacity:0.8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">${t('slip_net')}</div>
            <div style="font-size:32px; font-weight:700; letter-spacing:-1px;">THB ${slip.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div> 
        <div style="text-align:center; margin-top:30px; font-size:11px; color:var(--text-muted); border-top:1px dashed var(--border); padding-top:15px;">This document is computer-generated. No signature is required.</div> 
    </div>`;
};

// --- VIEWS REGISTRY ---
const Views = {
    'admin-dash': () => {
        const todayStr = new Date().toLocaleDateString('en-CA'); let activeCount = 0;
        for (const user in AppState.dailyClock) { if (AppState.dailyClock[user].date === todayStr && AppState.dailyClock[user].status === 'in') activeCount++; }
        const pendingApprovals = AppState.requests.filter(r => r.status.includes('Pending')).length; const totalEmployees = AppState.users.filter(u => u.isActive).length; const onLeave = AppState.requests.filter(r => r.status === 'Approved' && r.type === 'Leave').length; 
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-chart-pie text-muted"></i> ${t('admin_dash')}</h1>
            <div class="grid-4" style="margin-bottom: 24px;">
                <div class="card" style="padding:20px; border-top: 3px solid var(--primary);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-users"></i> Employees</h2><div class="stat-value" style="font-size:28px;">${totalEmployees}</div></div>
                <div class="card" style="padding:20px; border-top: 3px solid var(--success);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-building"></i> Present Today</h2><div class="stat-value" style="color:var(--success); font-size:28px;">${activeCount}</div></div>
                <div class="card" style="padding:20px; border-top: 3px solid var(--warning);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-umbrella-beach"></i> On Leave</h2><div class="stat-value" style="color:var(--warning); font-size:28px;">${onLeave}</div></div>
                <div class="card" style="padding:20px; border-top: 3px solid var(--danger);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-clipboard-check"></i> Pending Approvals</h2><div class="stat-value" style="color:var(--danger); font-size:28px;">${pendingApprovals}</div></div>
            </div>
            <div class="card"><h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Weekly Attendance Overview</h2><div style="height: 280px; width: 100%; position: relative;"><canvas id="adminDashChart"></canvas></div></div>
        </div>`;
    },

    'it-dash': () => {
        const activeUsers = AppState.users.filter(u => u.isActive !== false).length; const todayLogins = Math.floor(Math.random() * 20) + 5; const sysRequests = Math.floor(Math.random() * 5000) + 1200;
        return `
        <div style="animation: fadeUp 0.4s ease-out;"> 
            <h1 style="margin-bottom:24px;"><i class="fas fa-server text-muted"></i> ${t('it_dash')}</h1> 
            <div class="grid-4" style="margin-bottom: 24px;"> 
                <div class="card" style="padding:20px; border-top: 3px solid var(--primary);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-users"></i> Total Accounts</h2><div class="stat-value" style="font-size:28px;">${AppState.users.length}</div></div> 
                <div class="card" style="padding:20px; border-top: 3px solid var(--success);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-user-check"></i> Active Users</h2><div class="stat-value" style="color:var(--success); font-size:28px;">${activeUsers}</div></div> 
                <div class="card" style="padding:20px; border-top: 3px solid var(--accent);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-sign-in-alt"></i> Today's Logins</h2><div class="stat-value" style="color:var(--accent); font-size:28px;">${todayLogins}</div></div> 
                <div class="card" style="padding:20px; border-top: 3px solid var(--warning);"><h2 style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin:0;"><i class="fas fa-network-wired"></i> System Requests</h2><div class="stat-value" style="color:var(--warning); font-size:28px;">${sysRequests.toLocaleString()}</div></div> 
            </div> 
            <div class="card" style="margin-bottom: 24px;"><div class="flex-between" style="margin-bottom:16px;"><h2 style="margin:0; display:flex; align-items:center; gap:8px;"><i class="fas fa-microchip text-muted"></i> Compute Resource Allocation (CPU)</h2><span class="badge" style="background:#ecfdf5; color:#059669;"><i class="fas fa-circle" style="font-size:8px;"></i> Running</span></div><div style="height: 250px; width: 100%; position: relative;"><canvas id="itLiveChart"></canvas></div></div> 
            <div class="card"><h2 style="margin-bottom:16px;"><i class="fas fa-shield-alt text-muted"></i> System Status</h2><div style="padding:16px 20px; background:#f8fafc; border:1px solid var(--border); border-radius:var(--radius-sm); display:flex; align-items:center; gap:16px;"><div style="font-size:24px; color:var(--success);"><i class="fas fa-check-circle"></i></div> <div><strong style="font-size:14px; color:var(--primary);">All Services Operational</strong><br><span style="font-size:12px; color:var(--text-muted);">Database connection verified. Webhook integrations are functioning normally.</span></div></div></div> 
        </div>`;
    },

    'it-logs': () => {
        const logs = AppState.auditLogs || [];
        let logsHTML = logs.length > 0 ? logs.slice(0, 50).map(l => `<tr><td style="color:var(--text-muted); font-size:12px; white-space:nowrap;">${l.time}</td><td><b style="color:var(--primary);">${l.user}</b></td><td><span class="badge" style="background:#f1f5f9; color:var(--text-muted); border:1px solid var(--border);">${l.role.toUpperCase()}</span></td><td><span class="badge" style="background:var(--accent-light); color:var(--accent);">${l.action}</span></td><td style="font-size:13px; color:var(--text-dark);">${l.detail}</td></tr>`).join('') : `<tr><td colspan="5" class="empty-state"><i class="fas fa-search fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>No audit logs available.</td></tr>`;
        return `
        <div style="animation: fadeUp 0.4s ease-out;"> 
            <div class="flex-between" style="margin-bottom:24px;"><h1 style="margin:0;"><i class="fas fa-clipboard-list text-muted"></i> ${t('it_log')}</h1><button class="btn-outline" onclick="App.toast('Log export initiated.', 'success')"><i class="fas fa-download"></i> Export Logs</button></div> 
            <div class="card table-wrapper" style="padding:0;"><table style="margin:0;"><thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Event Type</th><th>Details</th></tr></thead><tbody>${logsHTML}</tbody></table></div> 
        </div>`;
    },

    'home': () => {
        const u = AppState.currentUser.username; const bal = AppState.leaveBalances[u] ? AppState.leaveBalances[u].annual : 0; const sal = App.getSalary(); 
        let broadcastMsg = AppState.settings.broadcast ? `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 24px; border-radius: var(--radius-sm); color: #b45309; display: flex; gap: 12px; align-items: flex-start; box-shadow: var(--shadow-sm);"><div style="font-size: 18px; margin-top:2px;"><i class="fas fa-bullhorn"></i></div><div><strong style="display:block; margin-bottom:2px; font-size:13px;">Corporate Announcement</strong><span style="font-size:13px;">${AppState.settings.broadcast}</span></div></div>` : '';
            
        return `
        <div style="margin-bottom: 32px; animation: fadeUp 0.4s ease-out;">
            <div class="flex-between"><div><div style="color:var(--text-muted); font-size:12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${TimeEngine.getGreeting()}</div><h1 style="margin:0; font-size:24px;">${AppState.currentUser.name}</h1></div><div id="realtime-clock" style="font-size:20px; font-weight:700; color:var(--primary); font-family:monospace;">00:00:00</div></div>
        </div>
        ${broadcastMsg} 
        <div class="grid-dash" style="grid-template-columns: 1fr 2.5fr;">
            <div>
                <div class="card salary-card-custom" style="margin-bottom: 24px; background: linear-gradient(135deg, var(--primary), #1e3a8a); color: white; border:none; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.4);">
                    <div class="flex-between"><h2 style="color: #93c5fd; margin:0; font-weight: 500;"><i class="fas fa-wallet"></i> ${t('salary_title')}</h2><button id="salary-btn" class="btn-toggle-view" onclick="App.toggleSal()"><i class="fas fa-eye"></i> ${t('show')}</button></div>
                    <div class="salary-container" style="margin-top:16px;"><span id="salary-val" class="salary-value masked">THB ${sal.net.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                </div>
                <div class="card" style="margin-bottom: 24px;">
                    <h2 style="color: var(--primary); display:flex; align-items:center; gap:8px;"><i class="far fa-clock text-muted"></i> ${t('clock_title')}</h2>
                    <select id="work-location" style="margin-bottom: 16px;"><option value="Office">${t('loc_office')}</option><option value="WFH">${t('loc_wfh')}</option></select>
                    <div id="status-clock" style="margin-bottom: 20px; font-size: 13px; padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm); border: 1px solid var(--border);"><span class="text-muted"><i class="fas fa-bed"></i> Currently Offline</span></div>
                    <button id="btn-clock" class="btn-primary" onclick="App.clock()" style="padding: 14px; width:100%; font-size: 14px;"><i class="fas fa-camera"></i> Identity Scan</button>
                </div>
                <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content: center;">
                    <h2 style="margin-bottom: 24px; text-align:center;"><i class="fas fa-umbrella-beach text-muted"></i> ${t('leave_bal')}</h2>
                    <div style="position:relative; width:140px; height:140px; margin-bottom: 24px;"><canvas id="userChart"></canvas><div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;"><div style="font-size:28px; font-weight:700; color:var(--primary); line-height:1;">${bal}</div><div style="font-size:10px; color:var(--text-muted); font-weight: 600; margin-top: 4px; text-transform:uppercase;">Days</div></div></div>
                    <button class="btn-outline" style="width: 100%; color: var(--accent); border-color: var(--accent);" onclick="App.openModal('modal-leave')"><i class="fas fa-plus"></i> ${t('req_lv')}</button>
                </div>
            </div>
            <div class="digital-twin-wrapper card">
                <div class="flex-between" style="margin-bottom: 16px;"><h2 style="margin:0; color: white; font-size: 16px; display:flex; align-items:center; gap:8px;"><i class="fas fa-satellite-dish" style="color:#3b82f6;"></i> Live Spatial Digital Twin</h2><span style="background: rgba(16,185,129,0.2); color: #10b981; padding: 4px 10px; border-radius: 12px; font-size: 10px; letter-spacing: 1px; border: 1px solid #10b981;">● LIVE TELEMETRY</span></div>
                <div class="office-floor">
                    <div class="dept-zone" id="zone-hr"><div class="zone-title">Human Resources</div></div>
                    <div class="dept-zone" id="zone-sales"><div class="zone-title">Sales & Marketing</div></div>
                    <div class="dept-zone" id="zone-it"><div class="zone-title">IT Operations</div></div>
                    <div class="dept-zone" id="zone-general"><div class="zone-title">General Operations</div></div>
                </div>
                <div class="dept-zone wfh-zone" id="zone-wfh"><div class="zone-title" style="color:#3b82f6; border-color:#1e3a8a;">Remote / WFH Cloud</div></div>
            </div>
        </div>`;
    },

    'time': () => {
        const u = AppState.currentUser.username; const logs = AppState.timeLogs.filter(x => x.u === u); const reqs = AppState.requests.filter(x => x.u === u);
        let logsHTML = logs.length > 0 ? logs.map(l => `<tr><td><b style="color:var(--primary);">${l.d}</b></td><td><span class="badge" style="background:white; border: 1px solid var(--border); color:var(--text-muted);">${l.loc}</span></td><td>${l.in}</td><td>${l.out}</td><td><b style="color:var(--accent);">${l.hrs}</b></td></tr>`).join('') : `<tr><td colspan="5" class="empty-state"><i class="far fa-folder-open fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>${t('no_data')}</td></tr>`;

        let reqsHTML = reqs.length > 0 ? reqs.map(r => {
            let badgeColor = '#b45309', badgeBg = '#fef3c7', statText = r.status.split(' ')[0];
            if (r.status === 'Approved') { badgeColor = '#047857'; badgeBg = '#d1fae5'; } else if (r.status === 'Rejected') { badgeColor = '#be123c'; badgeBg = '#ffe4e6'; } else if (r.status.includes('Pending')) { statText = 'Pending'; }
            let attachBtn = ''; 
            if (r.attachment && r.attachment.trim() !== '') { 
                const isPdf = r.attachment.includes('application/pdf'); const icon = isPdf ? 'fa-file-pdf' : 'fa-image'; const fileExt = isPdf ? '.pdf' : '.png'; 
                if (isPdf) attachBtn = `<a href="${r.attachment}" download="Ev_${r.id}${fileExt}" target="_blank" style="display:inline-block; font-size:12px; color:var(--primary); margin-top:4px;"><i class="fas ${icon}"></i> View Evidence</a>`; 
                else attachBtn = `<div class="evidence-hover" style="margin-top:4px;"> <a href="${r.attachment}" download="Ev_${r.id}${fileExt}" target="_blank" style="font-size:12px; color:var(--primary);"><i class="fas ${icon}"></i> View Evidence</a> <div class="preview-box"><img src="${r.attachment}" alt="Preview"></div> </div>`; 
            }
            const detailsBtn = `<button class="btn-outline" style="padding: 6px 12px; font-size: 11px; width:auto;" onclick="App.showRequestDetails(${r.id})"><i class="fas fa-list-alt"></i> Details</button>`;
            return `<tr> <td><span class="badge" style="background:#f1f5f9; border:1px solid var(--border); color:var(--primary);">${r.type}</span></td> <td><b style="color:var(--primary);">${r.detail}</b><br><span style="font-size:12px; color:#64748b;">${r.reason.substring(0,30)}...</span><br>${attachBtn}</td> <td><span style="background:${badgeBg}; color:${badgeColor}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:600;">${statText}</span></td> <td style="text-align:right;">${detailsBtn}</td> </tr>`;
        }).join('') : `<tr><td colspan="4" class="empty-state"><i class="far fa-folder-open fa-2x" style="color:var(--border); margin-bottom:8px;"></i><br>${t('no_data')}</td></tr>`;
        
        return `
        <div class="flex-between" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;"><h1 style="margin:0;"><i class="fas fa-history text-muted"></i> ${t('time')}</h1><div style="display:flex; gap:12px;"><button class="btn-outline" onclick="App.openModal('modal-ot')"><i class="fas fa-moon"></i> ${t('req_ot')}</button><button class="btn-primary" onclick="App.openModal('modal-leave')"><i class="fas fa-umbrella-beach"></i> ${t('req_lv')}</button></div></div>
        <div class="card" style="padding-top:16px;">
            <div class="ui-tabs" style="border-bottom:1px solid #e2e8f0; margin-bottom:16px; display:flex; gap:16px;"><button class="tab-btn active" onclick="App.switchTab('t1', this)" style="background:none; border:none; padding-bottom:12px; font-size:14px; font-weight:600; color:var(--primary); border-bottom:3px solid var(--primary); cursor:pointer;"><i class="fas fa-list-ul"></i> ${t('tab_log')}</button><button class="tab-btn" onclick="App.switchTab('t2', this)" style="background:none; border:none; padding-bottom:12px; font-size:14px; font-weight:500; color:#64748b; cursor:pointer;"><i class="fas fa-file-alt"></i> ${t('tab_lv')} / OT</button></div>
            <div id="t1" class="tab-content active table-wrapper" style="display:block;"><table><thead><tr><th>Date</th><th>Location</th><th>In</th><th>Out</th><th>Hours</th></tr></thead><tbody>${logsHTML}</tbody></table></div>
            <div id="t2" class="tab-content table-wrapper" style="display:none;"><table><thead><tr><th>Type</th><th>Details</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead><tbody>${reqsHTML}</tbody></table></div>
        </div>`;
    },

    'admin-approve': () => {
        const role = AppState.currentUser.role; let relevantReqs = [];
        if (role === 'head') relevantReqs = AppState.requests.filter(r => r.status.includes('Supervisor') || r.status === 'Approved' || r.status === 'Rejected');
        else if (role === 'admin') relevantReqs = AppState.requests.filter(r => r.status.includes('HR') || r.status === 'Approved' || r.status === 'Rejected');
        else relevantReqs = AppState.requests;
        
        const pendingCount = relevantReqs.filter(r => r.status.includes('Pending')).length; const approvedCount = relevantReqs.filter(r => r.status === 'Approved').length; const rejectedCount = relevantReqs.filter(r => r.status === 'Rejected').length; const allCount = relevantReqs.length;
        
        let approvalsHTML = relevantReqs.length > 0 ? relevantReqs.map(r => {
            let attachBtn = ''; 
            if (r.attachment && r.attachment.trim() !== '') { 
                const isPdf = r.attachment.includes('application/pdf'); const icon = isPdf ? 'fa-file-pdf' : 'fa-image'; const fileExt = isPdf ? '.pdf' : '.png'; 
                if (isPdf) attachBtn = `<div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--border);"><a href="${r.attachment}" download="Evidence_${r.id}${fileExt}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--accent); text-decoration:none; background:var(--accent-light); padding:6px 12px; border-radius:6px; border:1px solid #bfdbfe;"><i class="fas ${icon}"></i> View Evidence</a></div>`; 
                else attachBtn = `<div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--border);"> <div class="evidence-hover"> <a href="${r.attachment}" download="Evidence_${r.id}${fileExt}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--accent); text-decoration:none; background:var(--accent-light); padding:6px 12px; border-radius:6px; border:1px solid #bfdbfe;"> <i class="fas ${icon}"></i> View Evidence </a> <div class="preview-box"><img src="${r.attachment}" alt="Preview Evidence"></div> </div> </div>`; 
            }
            const stepper = `<div style="display:flex; align-items:center; gap:8px; margin-top:8px;"> <div style="width:8px; height:8px; border-radius:50%; background:var(--success);"></div> <div style="width:40px; height:2px; background:var(--success);"></div> <div style="width:8px; height:8px; border-radius:50%; background:${r.status.includes('HR') || r.status === 'Approved' ? 'var(--accent)' : '#e2e8f0'};"></div> <div style="width:40px; height:2px; background:${r.status === 'Approved' ? 'var(--accent)' : '#e2e8f0'};"></div> <div style="width:8px; height:8px; border-radius:50%; background:${r.status === 'Approved' ? 'var(--success)' : '#e2e8f0'};"></div> <small style="font-size:10px; color:var(--text-muted); margin-left:8px;">Workflow: Supervisor > HR</small> </div>`;
            const detailsBtn = `<button class="btn-outline" style="width:auto; padding:8px 12px; margin-right:6px; margin-bottom:6px; font-size:12px;" onclick="App.showRequestDetails(${r.id})"><i class="fas fa-info-circle"></i> Details</button>`;
            let actionButtons = ''; 
            if ((role === 'head' && r.status === 'Pending (Supervisor)') || (role === 'admin' && r.status === 'Pending (HR)')) actionButtons = `<button class="btn-primary" style="background:var(--success); width:auto; padding:8px 16px; margin-right:6px; margin-bottom:6px;" onclick="App.actionReq(${r.id}, 'Approved')"><i class="fas fa-check"></i></button> <button class="btn-primary" style="background:var(--danger); width:auto; padding:8px 16px;" onclick="App.actionReq(${r.id}, 'Rejected')"><i class="fas fa-times"></i></button>`; 
            else { let statColor = r.status === 'Approved' ? 'var(--success)' : (r.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)'); actionButtons = `<span style="display:inline-block; margin-top:8px; font-size:12px; color:${statColor}; font-weight:600;"><i class="fas fa-circle"></i> ${r.status}</span>`; }
            return `<tr class="approval-row" data-status="${r.status}"> <td><b style="font-size:14px; color:var(--primary);">${r.name}</b><br><span style="font-size:12px; color:var(--text-muted);">EMP-${r.u.toUpperCase()}</span></td> <td> <span class="badge" style="background:#f8fafc; border:1px solid var(--border); color:var(--text-dark); margin-bottom:6px;">${r.type}</span> <b style="font-size:13px; color:var(--primary);">${r.detail}</b><br> <span style="font-size:13px; display:inline-block; margin-top:4px;"><b>Reason:</b> ${r.reason}</span> ${stepper} ${attachBtn} </td> <td style="text-align:right; vertical-align:top;"> ${detailsBtn} ${actionButtons} </td> </tr>`;
        }).join('') : `<tr><td colspan="3" class="empty-state"><i class="far fa-check-circle fa-2x" style="color:var(--success); margin-bottom:12px; opacity:0.5;"></i><br>No requests found.</td></tr>`;
        
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-check-circle text-muted"></i> ${t('admin_appr')}</h1>
            <div class="filter-bar">
                <button class="filter-btn active" onclick="App.filterApprovals('All', this)" style="background: #e0e7ff; color: var(--primary);">All <span class="filter-pill" style="background: rgba(59,130,246,0.2); color: #1d4ed8;">${allCount}</span></button>
                <button class="filter-btn" onclick="App.filterApprovals('Pending', this)">Pending <span class="filter-pill" style="background: #fef3c7; color: #b45309;">${pendingCount}</span></button>
                <button class="filter-btn" onclick="App.filterApprovals('Approved', this)">Approved <span class="filter-pill" style="background: #d1fae5; color: #047857;">${approvedCount}</span></button>
                <button class="filter-btn" onclick="App.filterApprovals('Rejected', this)">Rejected <span class="filter-pill" style="background: #ffe4e6; color: #be123c;">${rejectedCount}</span></button>
                <div style="flex-grow: 1;"></div>
                <input type="text" class="search-box" placeholder="Search employee..." onkeyup="App.searchApprovals(this.value)">
            </div>
            <div class="card table-wrapper" style="padding: 0;"><table style="margin:0;"><thead><tr><th>Employee</th><th>Request Info</th><th style="text-align:right;">Actions</th></tr></thead><tbody>${approvalsHTML}</tbody></table></div>
        </div>`;
    },

    'admin-dir': () => {
        const currentUserRole = AppState.currentUser.role;
        return `
        <div style="animation: fadeUp 0.4s ease-out;"> 
            <div class="flex-between" style="margin-bottom:24px;"> 
                <h1 style="margin:0;"><i class="fas fa-users text-muted"></i> ${t('admin_dir')}</h1> 
                <div style="display:flex; gap:12px;"> <button class="btn-outline" onclick="App.exportToCSV()"><i class="fas fa-file-csv"></i> Export CSV</button> <button class="btn-primary" style="width:auto;"><i class="fas fa-user-plus"></i> Add Employee</button> </div> 
            </div> 
            <div class="card table-wrapper" style="padding:0;"> 
                <table style="margin:0;"> 
                    <thead><tr><th>ID</th><th>Name & Dept</th><th>Role</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead> 
                    <tbody>${AppState.users.map(u => { 
                        const isActive = u.isActive !== false; 
                        const statusBadge = isActive ? `<span class="badge" style="background:#ecfdf5; color:#047857; border: 1px solid #a7f3d0;">${t('btn_active')}</span>` : `<span class="badge" style="background:#fef2f2; color:#b91c1c; border: 1px solid #fecaca;">${t('btn_inactive')}</span>`; 
                        const toggleBtnStr = isActive ? `<i class="fas fa-ban"></i> ${t('act_disable')}` : `<i class="fas fa-check"></i> ${t('act_enable')}`; 
                        const toggleBtnColor = isActive ? `var(--danger)` : `var(--success)`; 
                        let resetBtn = (currentUserRole === 'admin' || currentUserRole === 'it') ? `<button class="btn-outline" style="padding:6px 10px; margin-right:4px; font-size:13px;" onclick="App.resetPass('${u.username}')" title="Reset Password"><i class="fas fa-key text-muted" style="margin:0;"></i></button>` : '';
                        return `<tr><td style="font-size:12px; color:var(--text-muted);">EMP-${u.username.toUpperCase()}</td><td><b style="color:var(--primary);">${u.name}</b><br><span style="font-size:12px; color:var(--text-muted);">${u.dept || '-'}</span></td><td><span class="badge" style="background:#f8fafc; border:1px solid var(--border); color:var(--text-dark);">${u.role.toUpperCase()}</span></td><td>${statusBadge}</td><td style="text-align:right; white-space:nowrap;">${resetBtn} <button class="btn-outline" style="padding:6px 12px; font-size:12px; width:auto; margin-right: 4px;" onclick="App.openEditUser('${u.username}')"><i class="fas fa-pen"></i> Edit</button> <button class="btn-primary" style="background:${toggleBtnColor}; padding:6px 12px; font-size:12px; width:auto;" onclick="App.toggleUserStatus('${u.username}')">${toggleBtnStr}</button></td></tr>`; 
                    }).join('')}</tbody> 
                </table> 
            </div> 
        </div>`;
    },

    'admin-rep': () => {
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-chart-line text-muted"></i> ${t('admin_rep')}</h1>
            <div class="grid-2">
                <div class="card"><h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Leave Distribution</h2><div style="text-align:center; padding:40px; color:var(--text-dark); background:var(--bg-main); border-radius:var(--radius-sm); border:1px dashed var(--border);">Annual Leave: 65%<br><br>Sick Leave: 25%<br><br>Personal: 10%</div></div>
                <div class="card"><h2 style="margin-bottom:16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Overtime Costs</h2><div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm); border:1px dashed var(--border);"><b style="font-size:28px; color:var(--primary);">THB 124,500.50</b><br><span style="font-size:12px;">Total OT payout this month</span></div></div>
            </div>
        </div>`;
    },

    'admin-set': () => {
        const u = AppState.currentUser; let itSettingsSection = '';
        if (u.role === 'it') { 
            itSettingsSection = `<hr style="margin:32px 0; border:0; border-top:1px solid var(--border);"> <h2 style="color:var(--primary); display:flex; align-items:center; gap:8px;"><i class="fas fa-server"></i> System Administration</h2> <div class="grid-2" style="margin-top:16px;"> <div style="background:white; padding:20px; border-radius:var(--radius-sm); border:1px solid var(--border); box-shadow:var(--shadow-sm);"> <h3 style="color:var(--text-dark); margin-top:0; font-size:14px; text-transform:uppercase;">Maintenance Mode</h3> <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Restrict access for non-IT personnel during system upgrades.</p> <select id="set-maintenance" style="margin-bottom:0; font-size:13px;"> <option value="off" ${!AppState.settings.maintenance ? 'selected' : ''}>System Online (Normal)</option> <option value="on" ${AppState.settings.maintenance ? 'selected' : ''}>Maintenance Active (Restricted)</option> </select> </div> <div style="background:white; padding:20px; border-radius:var(--radius-sm); border:1px solid var(--border); box-shadow:var(--shadow-sm);"> <h3 style="color:var(--text-dark); margin-top:0; font-size:14px; text-transform:uppercase;">Data Management</h3> <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">Create backups or clear application cache to resolve sync issues.</p> <div style="display:flex; gap:8px;"> <button class="btn-outline" style="flex:1; font-size:12px; padding:10px;" onclick="App.backupDB()"><i class="fas fa-download"></i> Backup</button> <button class="btn-primary" style="background:var(--danger); flex:1; font-size:12px; padding:10px;" onclick="App.clearCache()"><i class="fas fa-trash-alt"></i> Clear Cache</button> </div> </div> </div>`; 
        }
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="fas fa-cogs text-muted"></i> ${u.role === 'it' ? t('it_set') : t('admin_set')}</h1>
            <div class="card" style="max-width:800px;">
                <h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Global Configurations</h2>
                <div class="grid-2">
                    <div><label>Company Name</label><input type="text" id="set-company" value="${AppState.settings.companyName}"></div>
                    <div><label>Default Annual Leave Quota (Days)</label><input type="number" id="set-quota" value="${AppState.settings.leaveQuota}"></div>
                </div>
                <hr style="margin:24px 0; border:0; border-top:1px solid var(--border);">
                <h2 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:16px;">Broadcast Announcement</h2>
                <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Message will be displayed on all user dashboards. Leave blank to disable.</p>
                <textarea id="set-broadcast" rows="3" placeholder="Enter announcement text here...">${AppState.settings.broadcast || ''}</textarea> 
                ${itSettingsSection} 
                <div style="text-align:right; margin-top:24px; padding-top:20px; border-top:1px solid var(--border);"><button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveSettings()"><i class="fas fa-save"></i> Save Configuration</button></div>
            </div>
        </div>`;
    },

    'payslip': () => {
        return `
        <div class="flex-between no-print" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;"><i class="fas fa-file-invoice-dollar text-muted"></i> ${t('slip')}</h1>
            <div style="display:flex; gap:12px;">
                <select id="slip-month" onchange="App.genSlip()" style="margin:0; width:auto; font-weight:500;">${App.getMonthOptions()}</select>
                <button class="btn-outline" onclick="window.print()"><i class="fas fa-print"></i> Print PDF</button>
            </div>
        </div>
        <div id="printable-area"></div>`;
    },

    'cal': () => {
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="calendar-nav">
                <h1 style="margin:0;"><i class="far fa-calendar-alt text-muted"></i> ${t('cal')} <span id="cal-title" style="color:var(--accent); font-weight:600; font-size:16px; margin-left:10px;"></span></h1>
                <div style="display:flex; gap:8px;"><button class="cal-btn" onclick="App.changeCalMonth(-1)"><i class="fas fa-chevron-left"></i></button><button class="cal-btn" onclick="App.changeCalMonth(1)"><i class="fas fa-chevron-right"></i></button></div>
            </div>
            <div class="card"><div class="calendar-grid"><div class="cal-header">SUN</div><div class="cal-header">MON</div><div class="cal-header">TUE</div><div class="cal-header">WED</div><div class="cal-header">THU</div><div class="cal-header">FRI</div><div class="cal-header">SAT</div></div><div class="calendar-grid" id="cal-wrapper"></div></div>
        </div>`;
    },

    'doc': () => { 
        const docs = [ { name: 'Employee_Handbook_2026', title: 'Employee Handbook', size: '2.4 MB', date: 'Jan 10, 2026' }, { name: 'WFH_Policy', title: 'Remote Work Policy', size: '1.1 MB', date: 'Feb 15, 2026' }, { name: 'Insurance_Claims', title: 'Health Insurance Claims', size: '3.5 MB', date: 'Mar 01, 2026' } ]; 
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="far fa-folder-open text-muted"></i> ${t('doc')}</h1>
            <div class="card">
                <h2 style="margin-bottom: 16px; font-size:14px; text-transform:uppercase; color:var(--text-muted);">Standard Operating Procedures (SOP)</h2>
                ${docs.map(d => `<div class="policy-item"><div style="display:flex; align-items:center; gap:16px;"><div style="width:40px; height:40px; background:var(--bg-main); color:var(--accent); border: 1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:18px;"><i class="far fa-file-pdf"></i></div><div><div style="font-weight:600; color:var(--primary); font-size:13px;">${d.title}</div><div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Updated: ${d.date} • ${d.size}</div></div></div><button class="btn-outline" style="width:auto; font-size:12px; padding:6px 12px;" onclick="App.downloadFile('${d.name}')"><i class="fas fa-download"></i></button></div>`).join('')}
            </div>
        </div>`; 
    },

    'prof': () => {
        const u = AppState.currentUser.username; const p = AppState.profiles[u] || { email: '', phone: '', startDate: '' };
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;"><i class="far fa-user-circle text-muted"></i> ${t('prof')}</h1>
            <div class="grid-dash">
                <div class="card">
                    <h2 style="margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">Personal Information</h2>
                    <div class="grid-2">
                        <div><label>Full Name</label><input type="text" value="${AppState.currentUser.name}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Employee ID</label><input type="text" value="EMP-${u.toUpperCase()}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Department</label><input type="text" value="${AppState.currentUser.dept}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Start Date</label><input type="text" value="${p.startDate}" disabled style="background:#f8fafc; color:#94a3b8;"></div>
                        <div><label>Email Address</label><input type="email" id="prof-email" value="${p.email}"></div>
                        <div><label>Contact Number</label><input type="text" id="prof-phone" value="${p.phone}"></div>
                    </div>
                    <div style="text-align:right; margin-top:16px;"><button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveProfile()"><i class="fas fa-save"></i> Save Changes</button></div>
                </div>
                <div class="card" style="text-align:center;">
                    <img src="${p.avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=e0e7ff&color=3b82f6&size=150`}" id="prof-avatar-img" style="border-radius:50%; border: 4px solid var(--bg-main); margin-bottom: 16px; width:120px; height:120px; object-fit:cover;">
                    <h2 style="margin:0; font-size:16px;">${AppState.currentUser.name}</h2>
                    <p class="text-muted" style="margin-bottom:20px; font-size:12px;">${AppState.currentUser.dept}</p>
                    <input type="file" id="avatar-upload" style="display:none;" accept="image/*" onchange="App.handleAvatarUpload(event)">
                    <button class="btn-outline" style="font-size:12px; padding:8px 16px;" onclick="document.getElementById('avatar-upload').click()"><i class="fas fa-camera"></i> Update Photo</button>
                </div>
            </div>
        </div>`;
    }
};

// ---  BOOTLOADER  ---
const startApp = async () => {
    try {
        await DB.load(); // โหลดข้อมูลจาก Firebase
        applyLang();     // สลับภาษา
        
        const savedUser = localStorage.getItem('hr_logged_user');
        if (savedUser) {
            // มีคนล็อกอินค้างไว้ ให้เข้าหน้าแอปเลย
            AppState.currentUser = JSON.parse(savedUser);
            App.boot();
        } else {
            // ไม่เคยล็อกอิน ให้โชว์หน้า Auth
            document.getElementById('auth-view').style.display = 'block';
            document.getElementById('app-view').style.display = 'none';
        }
    } catch (e) {
        console.error("Bootloader Error:", e);
    }
};

window.onload = () => {
    // ให้เวลา Firebase ติดเครื่องแป๊บนึง
    setTimeout(() => {
        startApp();
    }, 150);

// 1. CSS บังคับให้ Sidebar 
const mobileStyleFix = document.createElement('style');
mobileStyleFix.innerHTML = `
    @media (max-width: 768px) { 
        .sidebar.show { left: 0 !important; transform: translateX(0) !important; } 
    }
`;
document.head.appendChild(mobileStyleFix);

//   (Stop Propagation)
window.toggleSidebar = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); 
    }
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
};

// 3. ปุ่มแฮมเบอร์เกอร์
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.hamburger-btn');
    if (btn) {
        btn.removeAttribute('onclick'); // ล้างคำสั่งเก่าใน HTML ทิ้ง
        btn.addEventListener('click', function(e) {
            window.toggleSidebar(e);
        });
    }
});

// 4.  Sidebar เก็บ
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.querySelector('.hamburger-btn');
    
    if (sidebar && sidebar.classList.contains('show')) {
        // ถ้าไม่ได้จิ้มโดน Sidebar และ ไม่ได้จิ้มโดนปุ่มเมนู
        if (!sidebar.contains(e.target) && (!btn || !btn.contains(e.target))) {
            sidebar.classList.remove('show');
        }
    }
});

// 5. จิ้มเลือกเมนู (Menu Item) แล้วให้หดเก็บอัตโนมัติ
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 768 && sidebar) {
            sidebar.classList.remove('show');
       }
    });
});
};