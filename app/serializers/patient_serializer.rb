class PatientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :verification_status
end
