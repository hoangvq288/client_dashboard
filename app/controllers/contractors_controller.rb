class ContractorsController < ApplicationController
  before_action :set_contractor, only: [:show, :edit, :update, :destroy]

  # GET /contractors
  # GET /contractors.json
  def index
    if params[:partner_company_id].present?
      @contractors = Contractor.where(partner_company_id: params[:partner_company_id]).all
    elsif params[:company_id].present?
      @contractors = Contractor.for_given_clients(Company.where(id: params[:company_id]).first.client_ids).all
    else
      @contractors = Contractor.all
    end
  end

  # GET /contractors/1
  # GET /contractors/1.json
  def show
  end

  # GET /contractors/new
  def new
    @contractor = Contractor.new
  end

  # GET /contractors/1/edit
  def edit
  end

  # POST /contractors
  # POST /contractors.json
  def create
    @contractor = Contractor.new(contractor_params)

    respond_to do |format|
      if @contractor.save
        format.html { redirect_to @contractor, notice: 'Contractor was successfully created.' }
        format.json { render :show, status: :created, location: @contractor }
      else
        format.html { render :new }
        format.json { render json: @contractor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contractors/1
  # PATCH/PUT /contractors/1.json
  def update
    respond_to do |format|
      if @contractor.update(contractor_params)
        format.html { redirect_to @contractor, notice: 'Contractor was successfully updated.' }
        format.json { render :show, status: :ok, location: @contractor }
      else
        format.html { render :edit }
        format.json { render json: @contractor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contractors/1
  # DELETE /contractors/1.json
  def destroy
    @contractor.destroy
    respond_to do |format|
      format.html { redirect_to contractors_url, notice: 'Contractor was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contractor
      @contractor = Contractor.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contractor_params
      params.require(:contractor).permit(:first_name, :last_name, :partner_company_id, :company_id)
    end
end
