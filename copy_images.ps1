$src = "C:\Users\Alok Chandra\.gemini\antigravity\brain\5f07a630-1cf2-4716-a936-e1740b6ae071"
$dst = ".\public\images"

New-Item -ItemType Directory -Force -Path $dst | Out-Null

$map = @{
  "hero"      = "hero_table"
  "manifesto" = "manifesto_hands"
  "gallery-1" = "gallery_1_cabinet"
  "gallery-2" = "gallery_2_table"
  "gallery-3" = "gallery_3_armchair"
  "gallery-4" = "gallery_4_detail"
  "gallery-5" = "gallery_5_side_tables"
  "gallery-6" = "gallery_6_sideboard"
  "process-1" = "process_concept"
  "process-2" = "process_material"
  "process-3" = "process_joinery"
  "process-4" = "process_finishing"
}

foreach ($k in $map.Keys) {
  $pattern = $map[$k] + "_*.png"
  $f = Get-ChildItem -Path $src -Filter $pattern | Select-Object -First 1
  if ($f) {
    $dest = Join-Path $dst ($k + ".png")
    Copy-Item $f.FullName $dest
    Write-Host "Copied $($f.Name) -> $dest"
  } else {
    Write-Host "NOT FOUND: $pattern"
  }
}
Write-Host "All done."
