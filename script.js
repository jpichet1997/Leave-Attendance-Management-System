// --- 1. Language Config ---
let lang = localStorage.getItem('hr_lang') || 'th';
const dict = {
    'th': {
        'dash': 'หน้าหลัก', 'time': 'ลงเวลา & วันลา', 'slip': 'สลิปเงินเดือน', 'cal': 'ปฏิทินบริษัท', 'doc': 'เอกสารองค์กร', 'prof': 'โปรไฟล์ส่วนตัว',
        'admin_dash': 'สถิติภาพรวม', 'admin_appr': 'อนุมัติคำขอ', 'admin_dir': 'รายชื่อพนักงาน', 'admin_rep': 'รายงานวิเคราะห์', 'admin_set': 'ตั้งค่าระบบ',
        'welcome': 'ยินดีต้อนรับกลับมา,', 'clock_title': 'ระบบลงเวลา', 'clock_btn_in': 'บันทึกเข้างาน', 'clock_btn_out': 'บันทึกออกงาน',
        'loc_office': '🏢 สำนักงานใหญ่', 'loc_wfh': '🏠 WFH', 'salary_title': 'เงินเดือนสุทธิ (เดือนนี้)',
        'show': 'แสดง', 'hide': 'ซ่อน', 'leave_bal': 'วันลาคงเหลือ', 'req_ot': 'ขอทำ OT', 'req_lv': 'ขอลางาน',
        'tab_log': 'ประวัติลงเวลา', 'tab_lv': 'ประวัติการลา', 'tab_ot': 'ประวัติ OT', 'no_data': 'ไม่พบข้อมูล', 
        'approve': 'อนุมัติ', 'reject': 'ปฏิเสธ', 'loading': 'กำลังดึงข้อมูล...'
    },
    'en': {
        'dash': 'Dashboard', 'time': 'Time & Leave', 'slip': 'E-Payslip', 'cal': 'Company Calendar', 'doc': 'Policies & Docs', 'prof': 'My Profile',
        'admin_dash': 'Overview', 'admin_appr': 'Approvals', 'admin_dir': 'Employee Directory', 'admin_rep': 'Analytics', 'admin_set': 'System Settings',
        'welcome': 'Welcome back,', 'clock_title': 'Attendance System', 'clock_btn_in': 'Clock In', 'clock_btn_out': 'Clock Out',
        'loc_office': '🏢 Head Office', 'loc_wfh': '🏠 Remote WFH', 'salary_title': 'Net Salary (Current)',
        'show': 'Show', 'hide': 'Hide', 'leave_bal': 'Leave Balance', 'req_ot': 'Request OT', 'req_lv': 'Request Leave',
        'tab_log': 'Clock Logs', 'tab_lv': 'Leave History', 'tab_ot': 'OT History', 'no_data': 'No records found', 
        'approve': 'Approve', 'reject': 'Reject', 'loading': 'Fetching data...'
    }
};

const t = (key) => dict[lang][key] || key;

function toggleLanguage() { 
    lang = lang === 'th' ? 'en' : 'th'; 
    localStorage.setItem('hr_lang', lang); 
    applyLang(); 
    
    if (AppState && AppState.currentUser) {
        App.boot();
    }
}

function applyLang() { 
    document.querySelectorAll('.th-en').forEach(el => el.innerText = el.getAttribute(`data-${lang}`)); 
    const btn = document.getElementById('top-lang-btn'); 
    if(btn) btn.innerText = lang === 'th' ? 'EN' : 'TH'; 
}

// --- 2. Database & State (Firebase Version) ---
const defaultProfile = { email: 'user@quantum.co.th', phone: '081-234-5678', dept: 'IT Operations', startDate: '2024-01-15', avatar: '' };

const firebaseConfig = {
    apiKey: "AIzaSyAUHCBVj2_6grlBdexUmP1BjzflOCaHiMQ",
    authDomain: "hr-system-2026-7c138.firebaseapp.com",
    projectId: "hr-system-2026-7c138",
    storageBucket: "hr-system-2026-7c138.firebasestorage.app",
    messagingSenderId: "502248569009",
    appId: "1:502248569009:web:b56da4a67ea3290fdd0a90",
    measurementId: "G-SGL2CY68DY"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const dbRef = db.collection('hr_database').doc('main_state');

const defaultState = {
    users: [
        { username: 'admin', password: '123', name: 'Manager Admin', role: 'admin', dept: 'Management' },
        { username: 'user', password: '123', name: 'พิเชษฐ์ แจ้งกระจ่าง', role: 'employee', dept: 'IT Operations' }
    ],
    currentUser: null, 
    dailyClock: {}, 
    leaveBalances: { 'user': { annual: 8.5, sick: 28 } }, 
    requests: [], 
    timeLogs: [], 
    notifications: [], 
    profile: defaultProfile,
    settings: { companyName: 'Quantum Corp', leaveQuota: 10 }
};

let AppState = defaultState;

const DB = {
    load: async () => {
        try {
            const doc = await dbRef.get();
            if (doc.exists) {
                AppState = doc.data();
            } else {
                await dbRef.set(defaultState);
                AppState = defaultState;
            }
            return AppState;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลจาก Firebase:", error);
            return AppState; 
        }
    },
    save: (state) => {
        // 🟢 สำคัญ: ก๊อปปี้ state และลบ currentUser ออกก่อนเซฟขึ้น Cloud เพื่อไม่ให้บัญชีตีกัน
        const dataToSave = { ...state };
        delete dataToSave.currentUser;
        
        dbRef.set(dataToSave, { merge: true }).catch(err => console.error("บันทึกข้อมูลไม่สำเร็จ:", err));
    }
};

let chartInst = null; 
let isSalaryVisible = false; 

// --- Calendar State ---
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
        if(list) list.innerHTML = notifs.slice(0, 5).map(n => `<div class="notif-item ${n.isRead?'':'unread'}" onclick="Notif.read(${n.id})"><div style="color:var(--primary); font-weight:500;">${n.message}</div><small style="color:var(--text-muted);">${n.time}</small></div>`).join('') || `<div class="empty-state">${t('no_data')}</div>`;
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
        AppState.users.push({ username: user, password: pass, name: name, role: role, dept: role==='admin'?'HR':'General' });
        AppState.leaveBalances[user] = { annual: AppState.settings.leaveQuota, sick: 30 }; 
        DB.save(AppState); App.toast('Account Created', 'success'); Auth.toggle('login'); 
    },
    login: () => {
        const u = document.getElementById('login-user').value, p = document.getElementById('login-pass').value;
        const acc = AppState.users.find(x => x.username === u && x.password === p);
        if (acc) { 
            AppState.currentUser = acc; 
            // 🟢 เซฟข้อมูลการล็อกอินลงในเครื่อง (Local Storage)
            localStorage.setItem('hr_logged_user', JSON.stringify(acc)); 
            App.boot(); 
        } 
        else alert('Invalid credentials');
    },
    logout: () => { 
        AppState.currentUser = null; 
        // 🟢 ลบข้อมูลออกจากเครื่องตอนกดออกจากระบบ
        localStorage.removeItem('hr_logged_user'); 
        location.reload(); 
    }
};

const App = {
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
                <div class="nav-divider">DASHBOARD</div>
                <div class="nav-item active" onclick="App.nav('admin-dash', this)">📊 ${t('admin_dash')}</div>
                <div class="nav-item" onclick="App.nav('admin-approve', this)">✅ ${t('admin_appr')} <span class="badge bg-danger" style="color:white; margin-left:auto;" id="badge-pending">0</span></div>
                <div class="nav-divider">ADMINISTRATION</div>
                <div class="nav-item" onclick="App.nav('admin-dir', this)">👥 ${t('admin_dir')}</div>
                <div class="nav-item" onclick="App.nav('admin-rep', this)">📈 ${t('admin_rep')}</div>
                <div class="nav-item" onclick="App.nav('admin-set', this)">⚙️ ${t('admin_set')}</div>`;
            App.nav('admin-dash', menu.children[1]);
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
        if(el) { document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active')); el.classList.add('active'); }
        
        document.getElementById('page-content').innerHTML = `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:50vh;">
                <div class="api-loader"></div><p style="margin-top:16px; color:var(--text-muted);">${t('loading')}</p>
            </div>`;

        setTimeout(() => {
            document.getElementById('page-content').innerHTML = Views[page]();
            if(page === 'home') { isSalaryVisible = false; App.updateClock(); App.renderChart(); }
            if(page === 'payslip') App.genSlip();
            if(page === 'cal') App.renderCalendarGrid();
            if(page === 'admin-rep') App.renderAdminCharts();
        }, 300);
    },

    // --- Features ---
    updateAvatarImg: () => {
        const img = document.getElementById('avatar-img');
        const src = AppState.profile.avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=eff6ff&color=2563eb&bold=true`;
        img.src = src;
        const profImg = document.getElementById('prof-avatar-img');
        if(profImg) profImg.src = src;
    },

    handleAvatarUpload: (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                AppState.profile.avatar = e.target.result;
                DB.save(AppState);
                App.updateAvatarImg();
                App.toast('Profile photo updated', 'success');
            }
            reader.readAsDataURL(file);
        }
    },

    saveProfile: () => {
        AppState.profile.email = document.getElementById('prof-email').value;
        AppState.profile.phone = document.getElementById('prof-phone').value;
        DB.save(AppState); App.toast('Profile saved securely', 'success');
    },

    downloadFile: (filename) => {
        App.toast(`Downloading ${filename}...`);
        const blob = new Blob(["Simulated Document Content for: " + filename], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename + ".txt"; a.click();
        window.URL.revokeObjectURL(url);
    },

    // --- Calendar Logic ---
    changeCalMonth: (dir) => {
        calMonth += dir;
        if(calMonth < 0) { calMonth = 11; calYear--; }
        else if(calMonth > 11) { calMonth = 0; calYear++; }
        App.renderCalendarGrid();
    },

    renderCalendarGrid: () => {
        const wrapper = document.getElementById('cal-wrapper');
        if(!wrapper) return;
        
        const d = new Date(calYear, calMonth, 1);
        const monthName = d.toLocaleString('en-US', { month: 'long' });
        document.getElementById('cal-title').innerText = `${monthName} ${calYear}`;

        const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
        const firstDayIndex = d.getDay();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === calMonth && today.getFullYear() === calYear;

        let html = '';
        for(let i=0; i<firstDayIndex; i++) html += `<div class="cal-day empty"></div>`;
        
        for(let i=1; i<=daysInMonth; i++) {
            let classes = "cal-day";
            if(isCurrentMonth && i === today.getDate()) classes += " today";
            
            // Mock Events based on day number to look realistic across months
            let eventHTML = "";
            if(i === 10) eventHTML = `<span class="event-badge" style="background:#fee2e2; color:#b91c1c;">Public Holiday</span>`;
            if(i === 25) eventHTML = `<span class="event-badge">Payroll Cut-off</span>`;
            
            html += `<div class="${classes}"><div style="font-weight:bold;">${i}</div>${eventHTML}</div>`;
        }
        wrapper.innerHTML = html;
    },

    // --- Admin Settings Logic ---
    saveSettings: () => {
        AppState.settings.companyName = document.getElementById('set-company').value;
        AppState.settings.leaveQuota = parseInt(document.getElementById('set-quota').value);
        DB.save(AppState); App.toast('System settings updated');
    },

    // --- Standard Logic (Clock, Leave, OT) ---
    clock: () => {
        const u = AppState.currentUser.username, d = new Date().toLocaleDateString('en-CA'), loc = document.getElementById('work-location').value;
        if (!AppState.dailyClock[u] || AppState.dailyClock[u].date !== d) AppState.dailyClock[u] = { date: d, status: 'out', in: null };
        
        let c = AppState.dailyClock[u];
        if (c.status === 'out') {
            c.status = 'in'; c.in = Date.now(); c.loc = loc; 
            App.toast('Clocked in successfully');
        } else {
            const hrs = ((Date.now() - c.in) / 3600000).toFixed(2);
            AppState.timeLogs.unshift({ u: u, d: d, in: new Date(c.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}), out: new Date().toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'}), hrs, loc: c.loc });
            c.status = 'out'; c.in = null;
            App.toast(`Clocked out. Total: ${hrs} hrs`);
        }
        DB.save(AppState); App.updateClock();
    },

    updateClock: () => {
        const btn = document.getElementById('btn-clock'), st = document.getElementById('status-clock'), sel = document.getElementById('work-location');
        if(!btn) return;
        let c = AppState.dailyClock[AppState.currentUser.username];
        if (c && c.status === 'in' && c.date === new Date().toLocaleDateString('en-CA')) {
            sel.disabled = true; btn.innerText = `⏹️ ${t('clock_btn_out')}`; btn.classList.replace('btn-primary', 'btn-danger');
            st.innerHTML = `<span style="color:var(--success); font-weight:600;">🟢 Active (${c.loc})</span><br><span class="text-muted">Since ${new Date(c.in).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</span>`;
        } else {
            sel.disabled = false; btn.innerText = `⏳ ${t('clock_btn_in')}`; btn.classList.replace('btn-danger', 'btn-primary');
            st.innerHTML = `<span class="text-muted">Not clocked in</span>`;
        }
    },

    submitLeave: () => {
        const u = AppState.currentUser.username, k = document.getElementById('lv-type').value.includes('Annual') ? 'annual' : 'sick';
        let days = document.getElementById('lv-format').value === 'hourly' ? 0.125 : 1; 
        if(AppState.leaveBalances[u][k] < days) return App.toast('Insufficient balance', 'error');
        AppState.leaveBalances[u][k] -= days;
        AppState.requests.unshift({ id: Date.now(), type: 'Leave', u: u, name: AppState.currentUser.name, detail: document.getElementById('lv-type').value, reason: document.getElementById('lv-reason').value, status: 'Pending' });
        DB.save(AppState); App.closeModal('modal-leave'); App.toast('Request Submitted'); App.nav('time', document.querySelectorAll('.nav-item')[1]); 
    },

    submitOT: () => {
        AppState.requests.unshift({ id: Date.now(), type: 'OT', u: AppState.currentUser.username, name: AppState.currentUser.name, detail: document.getElementById('ot-hours').value + ' Hrs', reason: document.getElementById('ot-reason').value, status: 'Pending' });
        DB.save(AppState); App.closeModal('modal-ot'); App.toast('OT Requested'); App.nav('time', document.querySelectorAll('.nav-item')[1]);
    },

    actionReq: (id, stat) => {
        const r = AppState.requests.find(x => x.id === id);
        if(r) {
            r.status = stat; DB.save(AppState);
            App.toast(`Marked as ${stat}`); App.nav('admin-approve', document.querySelectorAll('.nav-item')[1]); App.updateBadge();
            Notif.push(r.u, `Manager ${stat} your ${r.type} request.`);
        }
    },

    renderChart: () => {
        if(chartInst) chartInst.destroy();
        const bal = AppState.leaveBalances[AppState.currentUser.username].annual;
        chartInst = new Chart(document.getElementById('userChart'), { type: 'doughnut', data: { labels: ['Used', 'Remaining'], datasets: [{ data: [AppState.settings.leaveQuota-bal, bal], backgroundColor: ['#e2e8f0', '#2563eb'], borderWidth: 0 }] }, options: { cutout: '80%', plugins: { legend: { display: false } } } });
    },

    renderAdminCharts: () => {
        if(chartInst) chartInst.destroy();
        chartInst = new Chart(document.getElementById('adminChart'), { type: 'bar', data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ label: 'On-Time', data: [45, 48, 44, 46, 40], backgroundColor: '#059669' }, { label: 'Late', data: [5, 2, 6, 4, 10], backgroundColor: '#dc2626' }]}, options: { maintainAspectRatio: false, scales: { y: { stacked: true }, x: { stacked: true } } } });
    },

    genSlip: () => {
        document.getElementById('printable-area').innerHTML = `
            <div style="background:white; padding:40px; border:1px solid var(--border); border-radius: var(--radius); font-family:monospace; max-width:800px; margin:0 auto; box-shadow: var(--shadow-sm);">
                <h2 style="text-align:center; color:var(--primary); font-size: 20px;">${AppState.settings.companyName}</h2>
                <p style="text-align:center; color:var(--text-muted);">Secure E-Payslip - ${document.getElementById('slip-month').value}</p>
                <hr style="margin:24px 0; border:0; border-top:1px dashed #cbd5e1;">
                <div class="grid-2" style="font-size: 14px;">
                    <div>Employee Name:<br><b style="font-size:16px;">${AppState.currentUser.name}</b></div>
                    <div style="text-align:right">Net Pay Amount:<br><b style="font-size:24px; color:var(--primary);">฿ 53,237.32</b></div>
                </div>
            </div>`;
    },

    toggleSal: () => {
        isSalaryVisible = !isSalaryVisible;
        document.getElementById('salary-val').classList.toggle('masked');
        document.getElementById('salary-btn').innerHTML = isSalaryVisible ? `🔒 ${t('hide')}` : `👁️ ${t('show')}`;
    },

    switchTab: (id, btn) => { document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active')); document.getElementById(id).classList.add('active'); },
    openModal: (id) => document.getElementById(id).classList.add('show'),
    closeModal: (id) => document.getElementById(id).classList.remove('show'),
    updateBadge: () => { const b = document.getElementById('badge-pending'), c = AppState.requests.filter(r=>r.status==='Pending').length; if(b){b.innerText=c; b.style.display=c>0?'inline-block':'none';} },
    toast: (msg, type='primary') => { const box = document.getElementById('toast-container'), t = document.createElement('div'); t.className = 'toast'; t.innerText = msg; if(type==='error') t.style.borderLeftColor='var(--danger)'; box.appendChild(t); setTimeout(()=>t.remove(), 3500); }
};

// --- 5. VIEWS ---
const Views = {
    'home': () => {
        const bal = AppState.leaveBalances[AppState.currentUser.username].annual;
        return `
        <div style="margin-bottom: 32px; animation: fadeUp 0.4s ease-out;">
            <div style="color:var(--accent); font-size:13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${t('welcome')}</div>
            <h1 style="margin:0; font-size:28px;">${AppState.currentUser.name}</h1>
        </div>
        
        <div class="grid-dash">
            <div>
                <div class="card" style="background: linear-gradient(135deg, var(--primary), #1e3a8a); color: white; margin-bottom: 24px; border:none; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.4);">
                    <div class="flex-between">
                        <h2 style="color: #93c5fd; margin:0; font-weight: 500;">${t('salary_title')}</h2>
                        <button id="salary-btn" class="btn-toggle-view" onclick="App.toggleSal()">👁️ ${t('show')}</button>
                    </div>
                    <div class="salary-container">
                        <span id="salary-val" class="salary-value masked">฿ 53,237.32</span>
                    </div>
                </div>

                <div class="card" style="margin-bottom: 24px;">
                    <h2 style="color: var(--accent); display:flex; align-items:center; gap:8px;">${t('clock_title')}</h2>
                    <select id="work-location" style="margin-bottom: 16px;">
                        <option value="Office">${t('loc_office')}</option><option value="WFH">${t('loc_wfh')}</option>
                    </select>
                    <div id="status-clock" style="margin-bottom: 20px; font-size: 14px; padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm); border: 1px dashed var(--border);">-</div>
                    <button id="btn-clock" class="btn-primary" onclick="App.clock()" style="padding: 14px; width:100%; font-size: 14px;">${t('clock_btn_in')}</button>
                </div>
            </div>
            <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content: center;">
                <h2 style="margin-bottom: 24px;">${t('leave_bal')}</h2>
                <div style="position:relative; width:160px; height:160px; margin-bottom: 24px;">
                    <canvas id="userChart"></canvas>
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;">
                        <div style="font-size:32px; font-weight:700; color:var(--primary); line-height:1;">${bal}</div>
                        <div style="font-size:11px; color:var(--text-muted); font-weight: 600; margin-top: 4px;">DAYS</div>
                    </div>
                </div>
                <button class="btn-outline" style="width: 100%; color: var(--accent); border-color: var(--accent);" onclick="App.openModal('modal-leave')">${t('req_lv')}</button>
            </div>
        </div>`;
    },
    
    'time': () => {
        const u = AppState.currentUser.username;
        const logs = AppState.timeLogs.filter(x=>x.u===u), reqs = AppState.requests.filter(x=>x.u===u);
        return `
        <div class="flex-between" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;">${t('time')}</h1>
            <div style="display:flex; gap:12px;">
                <button class="btn-outline" onclick="App.openModal('modal-ot')">${t('req_ot')}</button>
                <button class="btn-primary" onclick="App.openModal('modal-leave')">${t('req_lv')}</button>
            </div>
        </div>
        <div class="card" style="padding-top:16px;">
            <div class="ui-tabs">
                <button class="tab-btn active" onclick="App.switchTab('t1', this)">${t('tab_log')}</button>
                <button class="tab-btn" onclick="App.switchTab('t2', this)">${t('tab_lv')} / OT</button>
            </div>
            <div id="t1" class="tab-content active table-wrapper">
                <table>
                    <thead><tr><th>Date</th><th>Location</th><th>In</th><th>Out</th><th>Hours</th></tr></thead>
                    <tbody>${logs.map(l=>`<tr><td><b style="color:var(--primary);">${l.d}</b></td><td><span class="badge" style="background:white; border: 1px solid var(--border); color:var(--text-muted);">${l.loc}</span></td><td>${l.in}</td><td>${l.out}</td><td><b style="color:var(--accent);">${l.hrs}</b></td></tr>`).join('') || `<tr><td colspan="5" class="empty-state">${t('no_data')}</td></tr>`}</tbody>
                </table>
            </div>
            <div id="t2" class="tab-content table-wrapper">
                <table>
                    <thead><tr><th>Type</th><th>Details</th><th>Status</th></tr></thead>
                    <tbody>${reqs.map(r=>`<tr><td><span class="badge" style="background:#f1f5f9; border:1px solid var(--border); color:var(--primary);">${r.type}</span></td><td><b>${r.detail}</b><br><span style="font-size:12px; color:var(--text-muted);">${r.reason}</span></td><td><span class="badge bg-${r.status.toLowerCase()}">${r.status}</span></td></tr>`).join('') || `<tr><td colspan="3" class="empty-state">${t('no_data')}</td></tr>`}</tbody>
                </table>
            </div>
        </div>`;
    },
    
    'payslip': () => `
        <div class="flex-between no-print" style="margin-bottom: 24px; animation: fadeUp 0.4s ease-out;">
            <h1 style="margin:0;">${t('slip')}</h1>
            <div style="display:flex; gap:12px;">
                <select id="slip-month" onchange="App.genSlip()" style="margin:0; width:auto; font-weight:500;"><option value="2026-03">March 2026</option></select>
                <button class="btn-primary" onclick="window.print()">Print PDF</button>
            </div>
        </div>
        <div id="printable-area"></div>
    `,

    'cal': () => `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="calendar-nav">
                <h1 style="margin:0;">${t('cal')} <span id="cal-title" style="color:var(--accent); font-weight:600; font-size:18px; margin-left:10px;"></span></h1>
                <div style="display:flex; gap:8px;">
                    <button class="cal-btn" onclick="App.changeCalMonth(-1)">⬅</button>
                    <button class="cal-btn" onclick="App.changeCalMonth(1)">➡</button>
                </div>
            </div>
            <div class="card">
                <div class="calendar-grid">
                    <div class="cal-header">SUN</div><div class="cal-header">MON</div><div class="cal-header">TUE</div><div class="cal-header">WED</div><div class="cal-header">THU</div><div class="cal-header">FRI</div><div class="cal-header">SAT</div>
                </div>
                <div class="calendar-grid" id="cal-wrapper"></div>
            </div>
        </div>
    `,

    'doc': () => {
        const docs = [
            { name: 'Employee_Handbook_2026', title: 'Employee Handbook (คู่มือพนักงาน)', size: '2.4 MB', date: 'Jan 10, 2026' },
            { name: 'WFH_Policy', title: 'Remote Work Policy (ระเบียบ WFH)', size: '1.1 MB', date: 'Feb 15, 2026' },
            { name: 'Insurance_Claims', title: 'Health Insurance Claims (การเบิกประกัน)', size: '3.5 MB', date: 'Mar 01, 2026' }
        ];
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">${t('doc')}</h1>
            <div class="card">
                <h2 style="margin-bottom: 16px;">Standard Operating Procedures (SOP)</h2>
                ${docs.map(d => `
                    <div class="policy-item">
                        <div style="display:flex; align-items:center; gap:16px;">
                            <div style="width:40px; height:40px; background:var(--accent-light); color:var(--accent); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px;">📄</div>
                            <div>
                                <div style="font-weight:600; color:var(--primary);">${d.title}</div>
                                <div style="font-size:12px; color:var(--text-muted);">Updated: ${d.date} • ${d.size}</div>
                            </div>
                        </div>
                        <button class="btn-outline" style="width:auto; font-size:12px;" onclick="App.downloadFile('${d.name}')">Download</button>
                    </div>
                `).join('')}
            </div>
        </div>`;
    },

    'prof': () => {
        const p = AppState.profile;
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">${t('prof')}</h1>
            <div class="grid-dash">
                <div class="card">
                    <h2 style="margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">Personal Information</h2>
                    <div class="grid-2">
                        <div><label>Full Name</label><input type="text" value="${AppState.currentUser.name}" disabled style="background:#f1f5f9; color:#94a3b8;"></div>
                        <div><label>Employee ID</label><input type="text" value="EMP-${AppState.currentUser.username.toUpperCase()}" disabled style="background:#f1f5f9; color:#94a3b8;"></div>
                        <div><label>Department</label><input type="text" value="${AppState.currentUser.dept}" disabled style="background:#f1f5f9; color:#94a3b8;"></div>
                        <div><label>Start Date</label><input type="text" value="${p.startDate}" disabled style="background:#f1f5f9; color:#94a3b8;"></div>
                        <div><label>Email Address</label><input type="email" id="prof-email" value="${p.email}"></div>
                        <div><label>Contact Number</label><input type="text" id="prof-phone" value="${p.phone}"></div>
                    </div>
                    <div style="text-align:right; margin-top:16px;">
                        <button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveProfile()">Save Changes</button>
                    </div>
                </div>
                <div class="card" style="text-align:center;">
                    <img src="${p.avatar || `https://ui-avatars.com/api/?name=${AppState.currentUser.name}&background=eff6ff&color=2563eb&size=150`}" id="prof-avatar-img" style="border-radius:50%; border: 4px solid var(--bg-main); margin-bottom: 16px; width:150px; height:150px; object-fit:cover;">
                    <h2 style="margin:0;">${AppState.currentUser.name}</h2>
                    <p class="text-muted" style="margin-bottom:20px;">${AppState.currentUser.dept}</p>
                    
                    <input type="file" id="avatar-upload" style="display:none;" accept="image/*" onchange="App.handleAvatarUpload(event)">
                    <button class="btn-outline" onclick="document.getElementById('avatar-upload').click()">Upload New Photo</button>
                </div>
            </div>
        </div>`;
    },

    // --- Admin Views ---
    'admin-dash': () => `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">${t('admin_dash')}</h1>
            <div class="grid-3" style="margin-bottom: 24px;">
                <div class="card" style="border-top: 4px solid var(--primary);"><h2>Total Employees</h2><div class="stat-value">${AppState.users.length}</div></div>
                <div class="card" style="border-top: 4px solid var(--warning);"><h2>Pending Approvals</h2><div class="stat-value" style="color:var(--warning);">${AppState.requests.filter(r=>r.status==='Pending').length}</div></div>
                <div class="card" style="border-top: 4px solid var(--success);"><h2>Active Today</h2><div class="stat-value" style="color:var(--success);">1</div></div>
            </div>
            <div class="card"><h2 style="margin-bottom:16px;">Weekly Attendance</h2><div style="height: 300px; width: 100%;"><canvas id="adminChart"></canvas></div></div>
        </div>
    `,
    'admin-approve': () => {
        const p = AppState.requests.filter(r=>r.status==='Pending');
        return `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">${t('admin_appr')}</h1>
            <div class="card table-wrapper" style="padding: 0;">
                <table style="margin:0;">
                    <thead><tr><th>Employee</th><th>Request Info</th><th style="text-align:right;">Actions</th></tr></thead>
                    <tbody>${p.map(r=>`
                        <tr>
                            <td><b style="font-size:14px; color:var(--primary);">${r.name}</b><br><span style="font-size:12px; color:var(--text-muted);">EMP-${r.u.toUpperCase()}</span></td>
                            <td><span class="badge" style="background:#f1f5f9; margin-bottom:4px;">${r.type}</span> <b style="font-size:13px;">${r.detail}</b><br><span style="font-size:12px; color:var(--text-muted);">${r.reason}</span></td>
                            <td style="text-align:right;">
                                <button class="btn-primary" style="background:var(--success); width:auto; padding:6px 14px; margin-right:4px;" onclick="App.actionReq(${r.id}, 'Approved')">${t('approve')}</button> 
                                <button class="btn-primary" style="background:var(--danger); width:auto; padding:6px 14px;" onclick="App.actionReq(${r.id}, 'Rejected')">${t('reject')}</button>
                            </td>
                        </tr>
                    `).join('') || `<tr><td colspan="3" class="empty-state">🎉 All caught up! No pending requests.</td></tr>`}</tbody>
                </table>
            </div>
        </div>`;
    },
    'admin-dir': () => `
        <div style="animation: fadeUp 0.4s ease-out;">
            <div class="flex-between" style="margin-bottom:24px;">
                <h1 style="margin:0;">${t('admin_dir')}</h1>
                <button class="btn-primary" style="width:auto;">+ Add Employee</button>
            </div>
            <div class="card table-wrapper" style="padding:0;">
                <table style="margin:0;">
                    <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Role</th></tr></thead>
                    <tbody>${AppState.users.map(u => `<tr>
                        <td>EMP-${u.username.toUpperCase()}</td>
                        <td><b>${u.name}</b></td>
                        <td>${u.dept || '-'}</td>
                        <td><span class="badge" style="background:#f1f5f9;">${u.role.toUpperCase()}</span></td>
                    </tr>`).join('')}</tbody>
                </table>
            </div>
        </div>
    `,
    'admin-rep': () => `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">${t('admin_rep')}</h1>
            <div class="grid-2">
                <div class="card"><h2 style="margin-bottom:16px;">Leave Distribution</h2><div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm);">Annual Leave: 65%<br>Sick Leave: 25%<br>Personal: 10%</div></div>
                <div class="card"><h2 style="margin-bottom:16px;">Overtime Costs</h2><div style="text-align:center; padding:40px; color:var(--text-muted); background:var(--bg-main); border-radius:var(--radius-sm);"><b style="font-size:24px; color:var(--primary);">฿ 124,500</b><br>Total OT payout this month</div></div>
            </div>
        </div>
    `,
    'admin-set': () => `
        <div style="animation: fadeUp 0.4s ease-out;">
            <h1 style="margin-bottom:24px;">${t('admin_set')}</h1>
            <div class="card" style="max-width:600px;">
                <h2>Global Configurations</h2>
                <label>Company Name</label><input type="text" id="set-company" value="${AppState.settings.companyName}">
                <label>Default Annual Leave Quota (Days)</label><input type="number" id="set-quota" value="${AppState.settings.leaveQuota}">
                <div style="text-align:right; margin-top:16px;">
                    <button class="btn-primary" style="width:auto; padding: 12px 24px;" onclick="App.saveSettings()">Save Configuration</button>
                </div>
            </div>
        </div>
    `
};

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('show');
}

document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return; 

    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickHamburger = event.target.classList.contains('hamburger-btn');

    if (window.innerWidth <= 768 && sidebar.classList.contains('show') && (!isClickInsideSidebar || event.target.closest('.nav-item'))) {
        if(!isClickHamburger){
            sidebar.classList.remove('show');
        }
    }
});

// --- 6. Initialization (Firebase Flow) ---
async function startApp() {
    await DB.load(); 
    applyLang(); 
    
    // 🟢 ตรวจสอบสถานะล็อกอินจากเครื่อง (Local Storage) แทน
    const savedUser = localStorage.getItem('hr_logged_user');
    if(savedUser) {
        AppState.currentUser = JSON.parse(savedUser);
        App.boot();
    } else {
        document.getElementById('auth-view').style.display = 'flex';
        document.getElementById('app-view').style.display = 'none';
    }
}

// เริ่มการทำงานของระบบ
startApp();