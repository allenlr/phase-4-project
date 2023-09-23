class DocumentsController < ApplicationController
    before_action :authorized

    def show
        document = Document.find(params[:id])
        render json: document
    end

    def index
        documents = Document.all
        render json: documents
    end

    def create
        document = Document.create(authorize_id: session[:user_id])
        render json: document, status: :created
    end

    def destroy
        document = Document.find(params[:id])
        document.destroy
        head :no_content
    end

end
