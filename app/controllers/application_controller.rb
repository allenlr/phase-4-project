class ApplicationController < ActionController::API
  require 'jwt'
  include ActionController::Cookies
  before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.jwt_secret)
  end

  def decoded_token
    if authorization_header
      token = authorization_header.split(' ')[1]
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
    @user
  end

  def logged_in?
    !!current_user
  end


  def authorized
    return render json:{error: "Not Authorized"}, status: :unauthorized unless logged_in?
  end

  private

  def authorization_header
    request.headers['Authorization']
  end

end
