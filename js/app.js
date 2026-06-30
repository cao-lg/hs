const App = {
    userScore: 525,
    userSubject: 'history',
    userRank: 25397,
    userEquivalent2025Score: 518,

    init() {
        this.initNavigation();
        this.initTabs();
        this.initRecommend();
        this.initChart();
        this.initRankQuery();
        this.initMajorRecommend();
        this.initMajorPage();
        this.initSchoolDetail();
        this.initScorePage();
    },

    initNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    },

    initTabs() {
        document.querySelectorAll('.tabs').forEach(tabsContainer => {
            const tabBtns = tabsContainer.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetTab = btn.dataset.tab;

                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === `tab-${targetTab}`) {
                            content.classList.add('active');
                        }
                    });
                });
            });
        });
    },

    getAllSchools() {
        const anhui = SchoolsAnhui.map(s => ({ ...s, province: '省内' }));
        const national = SchoolsNational.map(s => ({ ...s, province: '省外' }));
        const chong = SchoolsChong.map(s => ({ ...s, province: s.city.startsWith('安徽') ? '省内' : '省外' }));

        const seen = new Set();
        const result = [];

        [...anhui, ...national, ...chong].forEach(school => {
            if (!seen.has(school.name)) {
                seen.add(school.name);
                result.push(school);
            }
        });

        return result;
    },

    getRecommendations() {
        const allSchools = this.getAllSchools();

        const chongSchools = [];
        const wenSchools = [];
        const baoSchools = [];

        const seen = new Set();

        SchoolsChong.forEach(school => {
            if (!seen.has(school.name)) {
                seen.add(school.name);
                chongSchools.push({ ...school, province: school.city.startsWith('安徽') ? '省内' : '省外' });
            }
        });

        allSchools.forEach(school => {
            if (seen.has(school.name)) return;

            const rankDiff = school.rank - this.userRank;

            if (school.rank >= this.userRank - 6000 && school.rank < this.userRank) {
                seen.add(school.name);
                chongSchools.push(school);
            } else if (school.rank >= this.userRank && school.rank <= this.userRank + 5000) {
                seen.add(school.name);
                wenSchools.push(school);
            } else if (school.rank > this.userRank + 5000 && school.rank <= this.userRank + 12000) {
                seen.add(school.name);
                baoSchools.push(school);
            }
        });

        chongSchools.sort((a, b) => a.rank - b.rank);
        wenSchools.sort((a, b) => Math.abs(a.rank - this.userRank) - Math.abs(b.rank - this.userRank));
        baoSchools.sort((a, b) => a.rank - b.rank);

        return {
            chong: chongSchools.slice(0, 15),
            wen: wenSchools.slice(0, 30),
            bao: baoSchools.slice(0, 20)
        };
    },

    initRecommend() {
        const chongList = document.getElementById('chongList');
        const wenList = document.getElementById('wenList');
        const baoList = document.getElementById('baoList');

        if (!chongList && !wenList && !baoList) return;

        const recommendations = this.getRecommendations();

        if (chongList) {
            chongList.innerHTML = recommendations.chong.map(s => this.createSchoolCard(s, 'chong')).join('');
        }
        if (wenList) {
            wenList.innerHTML = recommendations.wen.map(s => this.createSchoolCard(s, 'wen')).join('');
        }
        if (baoList) {
            baoList.innerHTML = recommendations.bao.map(s => this.createSchoolCard(s, 'bao')).join('');
        }

        this.bindSchoolCardEvents();
    },

    createSchoolCard(school, level) {
        const levelTag = {
            chong: '<span class="tag warning">冲一冲</span>',
            wen: '<span class="tag success">稳妥</span>',
            bao: '<span class="tag primary">保底</span>'
        };

        const typeTag = school.type ? `<span class="tag secondary">${school.type}</span>` : '';
        const natureTag = `<span class="tag">${school.nature}</span>`;
        const provinceTag = school.province ? `<span class="tag">${school.province}</span>` : '';
        const groupTag = school.group ? `<span class="tag">${school.group}</span>` : '';

        return `
            <div class="school-card" data-school-id="${school.id}" data-school-name="${school.name}">
                <div class="school-card-header">
                    <h3>${school.name}</h3>
                    <div class="school-score">
                        <div class="score">${school.score}分</div>
                        <div class="rank">约${school.rank}位</div>
                    </div>
                </div>
                <div class="school-tags">
                    ${levelTag[level]}
                    ${typeTag}
                    ${natureTag}
                    ${provinceTag}
                    ${groupTag}
                </div>
                <div class="school-meta">
                    <span>📍 ${school.city}</span>
                    <span>📊 线差 ${school.score - this.userScore >= 0 ? '+' : ''}${school.score - this.userScore}分</span>
                </div>
            </div>
        `;
    },

    bindSchoolCardEvents() {
        document.querySelectorAll('.school-card').forEach(card => {
            card.addEventListener('click', () => {
                const schoolName = card.dataset.schoolName;
                window.location.href = `school.html?name=${encodeURIComponent(schoolName)}`;
            });
        });
    },

    initChart() {
        const chartContainer = document.getElementById('trendChart');
        if (!chartContainer) return;

        const years = ['2021', '2022', '2023', '2024', '2025', '2026'];
        const historyTekong = [];
        const historyBenke = [];
        const physicsTekong = [];
        const physicsBenke = [];

        years.forEach(year => {
            const data = ControlLines[year];
            if (year >= '2024') {
                historyTekong.push(data.history.tekong);
                historyBenke.push(data.history.benke);
                physicsTekong.push(data.physics.tekong);
                physicsBenke.push(data.physics.benke);
            } else {
                historyTekong.push(data.history.yiben);
                historyBenke.push(data.history.erben);
                physicsTekong.push(data.physics.yiben);
                physicsBenke.push(data.physics.erben);
            }
        });

        const width = chartContainer.offsetWidth || 800;
        const height = 300;
        const padding = { top: 30, right: 30, bottom: 40, left: 50 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const allScores = [...historyTekong, ...historyBenke, ...physicsTekong, ...physicsBenke];
        const minScore = Math.min(...allScores) - 20;
        const maxScore = Math.max(...allScores) + 20;

        const xScale = (i) => padding.left + (i / (years.length - 1)) * chartWidth;
        const yScale = (score) => padding.top + chartHeight - ((score - minScore) / (maxScore - minScore)) * chartHeight;

        const createPath = (data) => {
            return data.map((score, i) => {
                const x = xScale(i);
                const y = yScale(score);
                return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
            }).join(' ');
        };

        const createAreaPath = (data) => {
            const linePath = createPath(data);
            const lastX = xScale(data.length - 1);
            const firstX = xScale(0);
            const baseY = yScale(minScore);
            return linePath + ` L${lastX.toFixed(1)},${baseY.toFixed(1)} L${firstX.toFixed(1)},${baseY.toFixed(1)} Z`;
        };

        let svgContent = '';

        svgContent += `
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
                </linearGradient>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
                </linearGradient>
            </defs>
        `;

        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (chartHeight / 5) * i;
            const score = Math.round(maxScore - ((maxScore - minScore) / 5) * i);
            svgContent += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4,4"/>`;
            svgContent += `<text x="${padding.left - 10}" y="${y + 4}" fill="#64748b" font-size="12" text-anchor="end">${score}</text>`;
        }

        years.forEach((year, i) => {
            const x = xScale(i);
            svgContent += `<text x="${x}" y="${height - 15}" fill="#64748b" font-size="12" text-anchor="middle">${year}</text>`;
        });

        const datasets = [
            { data: historyTekong, color: '#6366f1', gradient: 'grad1' },
            { data: historyBenke, color: '#8b5cf6', gradient: 'grad2' },
            { data: physicsTekong, color: '#06b6d4', gradient: 'grad3' },
            { data: physicsBenke, color: '#10b981', gradient: 'grad4' }
        ];

        datasets.forEach(ds => {
            svgContent += `<path d="${createAreaPath(ds.data)}" fill="url(#${ds.gradient})"/>`;
        });

        datasets.forEach(ds => {
            svgContent += `<path d="${createPath(ds.data)}" fill="none" stroke="${ds.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        });

        datasets.forEach(ds => {
            ds.data.forEach((score, i) => {
                const x = xScale(i);
                const y = yScale(score);
                svgContent += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${ds.color}" stroke="white" stroke-width="2"/>`;
            });
        });

        chartContainer.innerHTML = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">${svgContent}</svg>`;
    },

    initRankQuery() {
        const queryBtn = document.getElementById('queryRankBtn');
        const queryYear = document.getElementById('queryYear');
        const querySubject = document.getElementById('querySubject');
        const queryScore = document.getElementById('queryScore');
        const resultDiv = document.getElementById('rankResult');

        if (!queryBtn || !queryYear || !querySubject || !queryScore || !resultDiv) return;

        const doQuery = () => {
            const year = queryYear.value;
            const subject = querySubject.value;
            const score = parseInt(queryScore.value);

            if (!score || score < 300 || score > 750) {
                alert('请输入有效的分数（300-750分）');
                return;
            }

            const rank = getRankByScore(score, subject, year);
            const subjectName = subject === 'history' ? '历史类' : '物理类';

            if (rank) {
                resultDiv.innerHTML = `
                    <div class="result-value">约${rank.toLocaleString()}名</div>
                    <div class="result-label">预估全省排名（${year}年${subjectName}）</div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="result-value">暂无数据</div>
                    <div class="result-label">该分数暂无法查询位次</div>
                `;
            }
        };

        queryBtn.addEventListener('click', doQuery);
        queryScore.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') doQuery();
        });
    },

    initMajorRecommend() {
        const container = document.getElementById('majorRecommend');
        if (!container) return;

        const hotMajors = Majors.filter(m => m.hotLevel === '热门').slice(0, 12);

        container.innerHTML = hotMajors.map(major => `
            <div class="major-card">
                <h3>${major.name}</h3>
                <div class="category">
                    <span class="tag primary">${major.category}</span>
                    <span class="tag">${major.majorClass}</span>
                    <span class="tag hot">${major.hotLevel}</span>
                </div>
                <div class="info">
                    <span>⏱️ ${major.duration}</span>
                    <span>🎓 ${major.degree}</span>
                    <span>💰 ${major.avgSalary}</span>
                    <span>📊 ${major.employmentRate}</span>
                </div>
                <div style="margin-top: 0.75rem; font-size: 0.8125rem; color: var(--text-secondary);">
                    <strong>就业方向：</strong>${Array.isArray(major.employment) ? major.employment.slice(0, 4).join('、') : major.employment}
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8125rem; color: var(--text-secondary);">
                    <strong>学科评估：</strong>${major.ranking}
                </div>
            </div>
        `).join('');
    },

    initMajorPage() {
        const majorList = document.getElementById('majorList');
        const categoryFilter = document.getElementById('categoryFilter');
        const majorSearch = document.getElementById('majorSearch');

        if (!majorList) return;

        const filterMajors = () => {
            const category = categoryFilter ? categoryFilter.value : '';
            const search = majorSearch ? majorSearch.value.toLowerCase() : '';

            let filtered = Majors;

            if (category) {
                filtered = filtered.filter(m => m.category === category);
            }

            if (search) {
                filtered = filtered.filter(m => 
                    m.name.toLowerCase().includes(search) ||
                    (Array.isArray(m.employment) ? m.employment.join(' ').toLowerCase().includes(search) : m.employment.toLowerCase().includes(search)) ||
                    (m.description && m.description.toLowerCase().includes(search))
                );
            }

            this.displayMajors(filtered, majorList);
        };

        if (categoryFilter) categoryFilter.addEventListener('change', filterMajors);
        if (majorSearch) majorSearch.addEventListener('input', filterMajors);

        this.displayMajors(Majors, majorList);
    },

    displayMajors(majors, container) {
        if (majors.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="icon">🔍</div>
                    <p>未找到符合条件的专业</p>
                </div>
            `;
            return;
        }

        container.innerHTML = majors.map(major => {
            const hotClass = major.hotLevel === '热门' ? 'hot' : (major.hotLevel === '冷门' ? 'cold' : '');
            return `
            <div class="major-card">
                <h3>${major.name}</h3>
                <div class="category">
                    <span class="tag primary">${major.category}</span>
                    <span class="tag">${major.majorClass}</span>
                    <span class="tag ${hotClass}">${major.hotLevel}</span>
                    <span class="tag ranking">${major.ranking}</span>
                </div>
                <div class="info">
                    <span>⏱️ ${major.duration}</span>
                    <span>🎓 ${major.degree}</span>
                    <span>💰 ${major.avgSalary}</span>
                    <span>📊 ${major.employmentRate}</span>
                </div>
                <div class="major-desc">${major.description}</div>
                <div class="major-section">
                    <strong>📚 主要课程：</strong>
                    <div class="tag-list">
                        ${major.courses.slice(0, 5).map(c => `<span class="tag small">${c}</span>`).join('')}
                    </div>
                </div>
                <div class="major-section">
                    <strong>💼 就业方向：</strong>
                    <div class="tag-list">
                        ${(Array.isArray(major.employment) ? major.employment : [major.employment]).slice(0, 4).map(e => `<span class="tag small">${e}</span>`).join('')}
                    </div>
                </div>
                <div class="major-section">
                    <strong>🎯 考研方向：</strong>
                    <div class="tag-list">
                        ${major.graduateDirection.slice(0, 3).map(g => `<span class="tag small">${g}</span>`).join('')}
                    </div>
                </div>
                <div class="major-section">
                    <strong>🏫 推荐院校：</strong>
                    <div>${major.relatedSchools.slice(0, 3).join('、')}${major.relatedSchools.length > 3 ? '等' : ''}</div>
                </div>
            </div>
        `}).join('');
    },

    initSchoolDetail() {
        const container = document.getElementById('schoolDetail');
        if (!container) return;

        const params = new URLSearchParams(window.location.search);
        const schoolName = params.get('name');

        if (!schoolName) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🏫</div>
                    <p>请从首页点击院校查看详情</p>
                    <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">返回首页</a>
                </div>
            `;
            return;
        }

        const allSchools = this.getAllSchools();
        const school = allSchools.find(s => s.name === decodeURIComponent(schoolName));

        if (!school) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="icon">❌</div>
                    <p>未找到该院校信息</p>
                    <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">返回首页</a>
                </div>
            `;
            return;
        }

        this.displaySchoolDetail(school, container);
    },

    displaySchoolDetail(school, container) {
        const typeTag = school.type ? `<span class="tag secondary" style="background: rgba(255,255,255,0.2); color: white;">${school.type}</span>` : '';
        const natureTag = `<span class="tag" style="background: rgba(255,255,255,0.2); color: white;">${school.nature}</span>`;

        const scoreHistory = school.scoreHistory || {
            2025: { score: school.score, rank: school.rank },
            2024: { score: school.score - 8, rank: Math.round(school.rank * 1.05) },
            2023: { score: school.score - 12, rank: Math.round(school.rank * 1.1) }
        };

        container.innerHTML = `
            <div class="school-detail-header">
                <h1>${school.name}</h1>
                <div class="meta">
                    ${typeTag}
                    ${natureTag}
                    <span>📍 ${school.city}</span>
                    ${school.group ? `<span>📋 ${school.group}</span>` : ''}
                    <span>🏷️ 招生代码：${school.code}</span>
                </div>
            </div>

            <div class="detail-grid">
                <div class="detail-item">
                    <div class="label">2025年录取分数</div>
                    <div class="value">${school.score}分</div>
                </div>
                <div class="detail-item">
                    <div class="label">2025年录取位次</div>
                    <div class="value">约${school.rank}位</div>
                </div>
                <div class="detail-item">
                    <div class="label">院校评级</div>
                    <div class="value">${school.rating || '暂无'}</div>
                </div>
                <div class="detail-item">
                    <div class="label">就业率</div>
                    <div class="value">${school.employment || '暂无'}</div>
                </div>
            </div>

            <div class="detail-section">
                <h2>院校简介</h2>
                <p style="color: var(--text-secondary); line-height: 1.8;">${school.description}</p>
            </div>

            <div class="detail-section">
                <h2>优势专业</h2>
                <div class="advantage-tags">
                    ${school.advantageMajors.map(m => `<span class="tag">${m}</span>`).join('')}
                </div>
            </div>

            <div class="detail-section">
                <h2>历年录取分数线（历史类）</h2>
                <table class="score-table">
                    <thead>
                        <tr>
                            <th>年份</th>
                            <th>录取分数</th>
                            <th>录取位次</th>
                            <th>与本年分差</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(scoreHistory).sort((a, b) => b[0] - a[0]).map(([year, data]) => `
                            <tr>
                                <td>${year}年</td>
                                <td><strong>${data.score}分</strong></td>
                                <td>约${data.rank}位</td>
                                <td>${data.score - this.userScore >= 0 ? '+' : ''}${data.score - this.userScore}分</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="detail-section">
                <h2>联系方式</h2>
                <div class="school-links">
                    <span>📞 电话：${school.phone}</span>
                    <a href="${school.website}" target="_blank">🌐 官网 →</a>
                </div>
            </div>
        `;
    },

    initScorePage() {
        const historyBody = document.getElementById('historyTableBody');
        const physicsBody = document.getElementById('physicsTableBody');

        if (historyBody) {
            const years = ['2026', '2025', '2024', '2023', '2022', '2021'];
            historyBody.innerHTML = years.map(year => {
                const data = ControlLines[year];
                const tekong = year >= '2024' ? data.history.tekong : data.history.yiben;
                const benke = year >= '2024' ? data.history.benke : data.history.erben;
                const diff = tekong - benke;
                const tekongLabel = year >= '2024' ? '特控线' : '一本线';
                const benkeLabel = year >= '2024' ? '本科线' : '二本线';
                return `
                    <tr>
                        <td><strong>${year}年</strong></td>
                        <td>${tekong}分（${tekongLabel}）</td>
                        <td>${benke}分（${benkeLabel}）</td>
                        <td>${diff}分</td>
                    </tr>
                `;
            }).join('');
        }

        if (physicsBody) {
            const years = ['2026', '2025', '2024', '2023', '2022', '2021'];
            physicsBody.innerHTML = years.map(year => {
                const data = ControlLines[year];
                const tekong = year >= '2024' ? data.physics.tekong : data.physics.yiben;
                const benke = year >= '2024' ? data.physics.benke : data.physics.erben;
                const diff = tekong - benke;
                const tekongLabel = year >= '2024' ? '特控线' : '一本线';
                const benkeLabel = year >= '2024' ? '本科线' : '二本线';
                return `
                    <tr>
                        <td><strong>${year}年</strong></td>
                        <td>${tekong}分（${tekongLabel}）</td>
                        <td>${benke}分（${benkeLabel}）</td>
                        <td>${diff}分</td>
                    </tr>
                `;
            }).join('');
        }

        const rankTableQueryBtn = document.getElementById('rankTableQueryBtn');
        const rankQueryYear = document.getElementById('rankQueryYear');
        const rankQuerySubject = document.getElementById('rankQuerySubject');
        const queryType = document.getElementById('queryType');
        const queryInput = document.getElementById('queryInput');
        const rankTableResult = document.getElementById('rankTableResult');

        if (rankTableQueryBtn && rankQueryYear && rankQuerySubject && queryType && queryInput && rankTableResult) {
            const doQuery = () => {
                const year = rankQueryYear.value;
                const subject = rankQuerySubject.value;
                const type = queryType.value;
                const value = parseInt(queryInput.value);

                if (!value || value <= 0) {
                    alert('请输入有效的数值');
                    return;
                }

                const subjectName = subject === 'history' ? '历史类' : '物理类';
                const yearLabel = year + '年';

                if (type === 'scoreToRank') {
                    const rank = getRankByScore(value, subject, year);
                    if (rank) {
                        rankTableResult.innerHTML = `
                            <div class="result-value">约${rank.toLocaleString()}名</div>
                            <div class="result-label">预估全省排名（${yearLabel}${subjectName}，${value}分）</div>
                        `;
                    } else {
                        rankTableResult.innerHTML = `
                            <div class="result-value">暂无数据</div>
                            <div class="result-label">该分数暂无法查询位次</div>
                        `;
                    }
                } else {
                    const score = getScoreByRank(value, subject, year);
                    if (score) {
                        rankTableResult.innerHTML = `
                            <div class="result-value">约${score}分</div>
                            <div class="result-label">预估对应分数（${yearLabel}${subjectName}，${value.toLocaleString()}位）</div>
                        `;
                    } else {
                        rankTableResult.innerHTML = `
                            <div class="result-value">暂无数据</div>
                            <div class="result-label">该位次暂无法查询分数</div>
                        `;
                    }
                }
            };

            rankTableQueryBtn.addEventListener('click', doQuery);
            queryInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') doQuery();
            });

            queryType.addEventListener('change', () => {
                if (queryType.value === 'scoreToRank') {
                    queryInput.placeholder = '请输入分数';
                    queryInput.value = '525';
                } else {
                    queryInput.placeholder = '请输入位次';
                    queryInput.value = '25611';
                }
            });
            
            doQuery();
        }

        const calcDiffBtn = document.getElementById('calcDiffBtn');
        const diffYear = document.getElementById('diffYear');
        const diffSubject = document.getElementById('diffSubject');
        const diffScore = document.getElementById('diffScore');
        const diffResult = document.getElementById('diffResult');

        if (calcDiffBtn && diffYear && diffSubject && diffScore && diffResult) {
            const calcDiff = () => {
                const year = diffYear.value;
                const subject = diffSubject.value;
                const score = parseInt(diffScore.value);

                if (!score || score < 300 || score > 750) {
                    alert('请输入有效的分数（300-750分）');
                    return;
                }

                const yearData = ControlLines[year] ? ControlLines[year][subject] : ControlLines['2026'][subject];
                const benkeDiff = score - yearData.benke;
                const tekongDiff = score - yearData.tekong;
                const rank = getRankByScore(score, subject, year);

                diffResult.innerHTML = `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        <div>
                            <div class="result-value">${benkeDiff >= 0 ? '+' : ''}${benkeDiff}分</div>
                            <div class="result-label">超本科线</div>
                        </div>
                        <div>
                            <div class="result-value">${tekongDiff >= 0 ? '+' : ''}${tekongDiff}分</div>
                            <div class="result-label">超特控线</div>
                        </div>
                        <div>
                            <div class="result-value">${rank ? rank.toLocaleString() : '暂无'}名</div>
                            <div class="result-label">预估位次（${year}年）</div>
                        </div>
                    </div>
                `;
            };

            calcDiffBtn.addEventListener('click', calcDiff);
            diffScore.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') calcDiff();
            });
            
            calcDiff();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
