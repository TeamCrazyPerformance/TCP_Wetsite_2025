import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const existingUsernames = ['admin', 'tcp_member', 'user123', 'developer'];
const existingEmails = [
  'admin@tcp.club',
  'member@tcp.club',
  'user@example.com',
];
const tcpMembers = [
  { name: '김TCP', phone: '010-1234-5678' },
  { name: '이Performance', phone: '010-2345-6789' },
  { name: '박Developer', phone: '010-3456-7890' },
];

function Register() {
  // 폼 입력 필드 상태 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [userFullName, setUserFullName] = useState(''); // 일반 사용자용 '이름' 상태 제거
  const [tcpMemberFullName, setTcpMemberFullName] = useState(''); // TCP 부원용 이름
  const [phoneNumber, setPhoneNumber] = useState(''); // TCP 부원용 전화번호

  // 비밀번호 가시성 상태
  const [showPassword, setShowPassword] = useState(false);

  // 체크박스 상태
  const [isTcpMember, setIsTcpMember] = useState(false); // 현재 TCP 부원입니다
  const [termsAgreed, setTermsAgreed] = useState(false); // 이용약관 동의

  // 유효성 검사 관련 상태
  const [usernameAvailability, setUsernameAvailability] = useState(null); // 'available', 'taken', 'checking'
  const [usernameMessage, setUsernameMessage] = useState('');
  const [signupButtonEnabled, setSignupButtonEnabled] = useState(false);

  
  

  // 사용자명 중복 확인 로직
  useEffect(() => {
    if (username.length === 0) {
      setUsernameAvailability(null);
      setUsernameMessage('');
      return;
    }

    setUsernameAvailability('checking');
    setUsernameMessage('');

    const timeoutId = setTimeout(() => {
      const isTaken = existingUsernames.includes(username.toLowerCase());
      if (isTaken) {
        setUsernameAvailability('taken');
        setUsernameMessage('이미 사용중인 사용자명입니다.');
      } else {
        setUsernameAvailability('available');
        setUsernameMessage('사용 가능한 사용자명입니다.');
      }
    }, 500); // 500ms 딜레이 시뮬레이션

    return () => clearTimeout(timeoutId); // 클린업 함수
  }, [username]);

  // 회원가입 버튼 활성화/비활성화 로직 (termsAgreed에 따라)
  useEffect(() => {
    setSignupButtonEnabled(termsAgreed);
  }, [termsAgreed]);

  // 비밀번호 가시성 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 항목 검사 (일반 사용자 '이름' 필드 제거에 따라 수정)
    if (!username || !password || !email) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (usernameAvailability === 'checking') {
      alert('사용자명 중복 확인 중입니다. 잠시 기다려주세요.');
      return;
    }
    if (usernameAvailability === 'taken') {
      alert('이미 사용중인 사용자명입니다. 다른 이름을 선택해주세요.');
      return;
    }
    if (existingEmails.includes(email.toLowerCase())) {
      alert('이미 사용중인 이메일입니다.');
      return;
    }

    // 비밀번호 강도 검사 (원본 HTML 로직)
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    // TCP 부원 정보 유효성 검사 (원본 HTML 로직)
    if (isTcpMember) {
      if (!tcpMemberFullName || !phoneNumber) {
        // tcpMemberFullName 사용
        alert('TCP 회원 정보를 모두 입력해주세요.');
        return;
      }
      const memberExists = tcpMembers.some(
        (member) =>
          member.name === tcpMemberFullName && member.phone === phoneNumber
      );
      if (!memberExists) {
        alert(
          '입력하신 정보와 일치하는 TCP 회원을 찾을 수 없습니다. 정보를 다시 확인해주세요.'
        );
        return;
      }
    } else {
      // TCP 부원이 아니라면, tcpMemberFullName과 phoneNumber는 필수가 아님
      // 일반 회원가입 시에는 이름과 전화번호가 필수가 아니므로,
      // 이 부분에 대한 별도 유효성 검사는 필요 없습니다.
      // 만약 일반 회원도 이름이 필수라면, 별도의 userFullName 상태를 유지해야 합니다.
      // 현재는 TCP 부원일 때만 이름/전화번호를 받으므로 이대로 진행합니다.
    }

    if (!termsAgreed) {
      alert('이용약관 및 개인정보처리방침에 동의해야 합니다.');
      return;
    }

    // 회원가입 처리 시뮬레이션
    // 실제로는 여기에 서버로 데이터를 전송하는 API 호출 로직이 들어갑니다.
    setSignupButtonEnabled(false); // 제출 중 버튼 비활성화
    // 회원가입 버튼 텍스트 변경은 실제 구현 시에 로딩 상태로 변경
    // 예: e.target.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>처리 중...';

    setTimeout(() => {
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      // 실제 앱에서는 로그인 페이지로 리다이렉트
      // navigate('/login');

      // 데모를 위한 폼 초기화
      setUsername('');
      setPassword('');
      setConfirmPassword(''); // confirmPassword 초기화 추가
      setEmail('');
      // setUserFullName(''); // userFullName 초기화 제거
      setTcpMemberFullName(''); // tcpMemberFullName 초기화
      setPhoneNumber('');
      setShowPassword(false);
      setIsTcpMember(false);
      setTermsAgreed(false);
      setUsernameAvailability(null);
      setUsernameMessage('');
      setSignupButtonEnabled(true); // 다시 활성화 (새로운 회원가입 대비)
    }, 2000);
  };

  return (
    <>
      {/* Register Form Section */}
      <section className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-10">
            {/* Top Branding */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src={logo}
                  alt="TCP 로고"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="orbitron text-3xl md:text-4xl font-bold gradient-text">
                회원가입
              </h2>
              <p className="text-gray-400 mt-2">
                Team Crazy Performance에 오신 것을 환영합니다
              </p>
            </div>

            {/* Form */}
            <form id="signupForm" onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="input-group">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-1 text-left"
                >
                  사용자명
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    placeholder="사용자명을 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div id="usernameValidation" className="validation-icon">
                    {usernameAvailability === 'checking' && (
                      <div className="loading-spinner"></div>
                    )}
                    {usernameAvailability === 'available' && (
                      <i className="fas fa-check success-icon"></i>
                    )}
                    {usernameAvailability === 'taken' && (
                      <i className="fas fa-times error-icon"></i>
                    )}
                  </div>
                </div>
                {usernameMessage && (
                  <div
                    id="usernameMessage"
                    className={`text-sm mt-1 ${usernameAvailability === 'available' ? 'text-green-400' : 'text-red-500'} text-left`}
                  >
                    {usernameMessage}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="input-group">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1 text-left"
                >
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
                <div className="text-sm text-gray-500 mt-1 text-left">
                  8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="input-group">
                <label
                  className="block text-sm font-medium text-gray-300 mb-2 text-left"
                  htmlFor="reg-confirm-password"
                >
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="reg-confirm-password"
                    className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <i className="fas fa-lock absolute right-3 top-3.5 text-gray-400"></i>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-2 text-left"
                  htmlFor="reg-email"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  required
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* General User Full Name Input (제거됨) */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-left" htmlFor="userFullName">이름</label>
                <div className="relative">
                  <input
                    type="text"
                    id="userFullName"
                    className="input-field w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 pr-10"
                    placeholder="실명을 입력하세요"
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)}
                    required
                  />
                  <i className="fas fa-signature absolute right-3 top-3.5 text-gray-400"></i>
                </div>
              </div> */}

              {/* TCP Member Checkbox */}
              <div>
                <label className="flex items-center text-left">
                  <input
                    type="checkbox"
                    id="tcpMember"
                    name="tcpMember"
                    className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded bg-transparent"
                    checked={isTcpMember}
                    onChange={(e) => setIsTcpMember(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    현재 TCP 부원입니다
                  </span>
                </label>
              </div>

              {/* Additional Fields (Conditional Rendering) */}
              {isTcpMember && (
                <div id="tcpMemberFields" className="slide-down show">
                  <div className="space-y-4 pt-4 border-t border-gray-700">
                    <div>
                      <label
                        htmlFor="tcpMemberFullName"
                        className="block text-sm font-medium text-gray-300 mb-1 text-left"
                      >
                        이름
                      </label>
                      <input
                        type="text"
                        id="tcpMemberFullName"
                        name="tcpMemberFullName"
                        className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="실명을 입력하세요"
                        value={tcpMemberFullName}
                        onChange={(e) => setTcpMemberFullName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-300 mb-1 text-left"
                      >
                        전화번호
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="010-1234-5678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-purple-400 flex items-center space-x-1 text-left">
                      <i className="fas fa-info-circle"></i>
                      <span>
                        입력된 정보는 부원 목록과 대조하여 연동됩니다.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms Agreement Checkbox */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <label className="flex items-start text-left">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    name="termsAgreement"
                    className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded mt-1 bg-transparent"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    <Link
                      to="#"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      이용약관
                    </Link>{' '}
                    및
                    <Link
                      to="#"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      개인정보처리방침
                    </Link>
                    에 동의합니다.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  id="signupBtn"
                  className={`w-full cta-button text-white py-3 px-4 rounded-md font-medium text-lg transition-all duration-200 ${signupButtonEnabled ? 'btn-enabled' : 'btn-disabled'}`}
                  disabled={!signupButtonEnabled}
                >
                  회원가입
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                이미 계정이 있으신가요?
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
