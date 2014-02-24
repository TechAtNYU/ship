require 'csv'

applicants = CSV.open "application_form_feb_22.csv", headers: true, header_converters: :symbol
Dir.mkdir("applicants_feb_22") unless Dir.exists? "applicants_feb_22"

applicants.each do |applicant|
  # could not get symbols to work for this 
  md = String.new 
  md += "---\n"
  md += "layout: post\n"
  md += "title: #{applicant[6]}\n"
  md += "creator: #{applicant[1]}\n"
  md += "school: #{applicant[3]}\n"
  md += "twitter: false\n"
  # these markdown files seem to need indictators to exterior resources, 
  # such as projects, to be prefixed with an "http://"    
  # the following line tests whether the link has this prefix & adds it in the case it is not 
  applicant[7][0..6] == "http://" ? md += "site: http://#{applicant[7]}\n" : md += "site: #{applicant[7]}\n"
  md += "image:\n"
  md += "featured: false\n"
  md += "demodays: true\n"
  md += "eboard: false\n"
  md += "alumni: false\n"
  md += "whichdd: february 2014\n"
  md += "---"
  fn = "applicants_feb_22/1-12-2014-#{applicant[6].delete(",.? ").downcase}.md"
  File.open(fn, 'w') do |md_file|
    md_file.puts md 
  end 
end 
