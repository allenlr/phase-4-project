class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorized

  def encode_toke(payload)
    JWT.encode(payload, Rails.application.credentials.jwt_secret)
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, Rails.application.credentials.jwt_secret, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end


  def authorized
    return render json:{error: "Not Authorized"}, status: :unauthorized unless logged_in?
  end

  private

  def auth_header
    request.headers['Authorization']
  end

end
