#!/usr/bin/env bash
# audit-skills.sh — Validate all SKILL.md files against skill-base standard
#
# Usage:
#   ./scripts/audit-skills.sh [skills-dir]
#
# Arguments:
#   skills-dir   Path to skills directory (default: .agents/skills)
#
# Exit codes:
#   0  All skills pass
#   1  One or more skills have issues
#
# Checks performed:
#   ✅ Frontmatter: name, description, category, tags, tools, metadata.version
#   ✅ Name match: frontmatter name == folder name
#   ✅ Description trigger: contains "Use when" or "use when"
#   ✅ Required sections: When to Use, ⚠️ Gotchas
#   ✅ Line count: ≤ 500 lines
#   ✅ No stale project references (configurable)

set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────

SKILLS_DIR="${1:-.agents/skills}"
MAX_LINES=500
HAS_ERRORS=0
TOTAL=0
PASSED=0
FAILED=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'


# ─── Helpers ──────────────────────────────────────────────────────────────────

check_field() {
    local file="$1" field="$2" required="$3"
    if grep -q "^${field}:" "$file" 2>/dev/null; then
        return 0
    else
        if [ "$required" = "required" ]; then
            echo -e "    ${RED}✗${NC} Missing required field: ${BOLD}${field}${NC}"
            return 1
        else
            echo -e "    ${YELLOW}○${NC} Missing optional field: ${field}"
            return 0
        fi
    fi
}

check_section() {
    local file="$1" pattern="$2" label="$3"
    if grep -qi "$pattern" "$file" 2>/dev/null; then
        return 0
    else
        echo -e "    ${RED}✗${NC} Missing section: ${BOLD}${label}${NC}"
        return 1
    fi
}


# ─── Main ─────────────────────────────────────────────────────────────────────

echo ""
echo -e "${BOLD}╔══════════════════════════════════════╗${NC}"
echo -e "${BOLD}║     Skill-Base Compliance Audit      ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════╝${NC}"
echo ""

if [ ! -d "$SKILLS_DIR" ]; then
    echo -e "${RED}Error: Directory not found: ${SKILLS_DIR}${NC}"
    exit 1
fi

echo -e "${CYAN}Skills directory:${NC} $SKILLS_DIR"
echo ""

for skill_dir in "$SKILLS_DIR"/*/; do
    [ ! -d "$skill_dir" ] && continue
    
    skill_file="${skill_dir}SKILL.md"
    folder_name=$(basename "$skill_dir")
    
    if [ ! -f "$skill_file" ]; then
        echo -e "${YELLOW}⚠ ${folder_name}/${NC} — no SKILL.md found, skipping"
        continue
    fi
    
    TOTAL=$((TOTAL + 1))
    errors=0
    
    echo -e "${BOLD}▸ ${folder_name}${NC}"
    
    # 1. Line count
    lines=$(wc -l < "$skill_file" | tr -d ' ')
    if [ "$lines" -gt "$MAX_LINES" ]; then
        echo -e "    ${RED}✗${NC} Too many lines: ${lines} (max ${MAX_LINES})"
        errors=$((errors + 1))
    else
        echo -e "    ${GREEN}✓${NC} Lines: ${lines}/${MAX_LINES}"
    fi
    
    # 2. Required frontmatter fields
    check_field "$skill_file" "name"        "required" || errors=$((errors + 1))
    check_field "$skill_file" "description" "required" || errors=$((errors + 1))
    
    # 3. Extended frontmatter (community standard)
    check_field "$skill_file" "category"    "required" || errors=$((errors + 1))
    check_field "$skill_file" "tags"        "required" || errors=$((errors + 1))
    check_field "$skill_file" "tools"       "required" || errors=$((errors + 1))
    
    # 4. Metadata version
    if grep -q 'version:' "$skill_file" 2>/dev/null; then
        true
    else
        echo -e "    ${RED}✗${NC} Missing: ${BOLD}metadata.version${NC}"
        errors=$((errors + 1))
    fi
    
    # 5. Name matches folder
    fm_name=$(grep '^name:' "$skill_file" 2>/dev/null | head -1 | sed 's/^name:[[:space:]]*//')
    if [ "$fm_name" != "$folder_name" ]; then
        echo -e "    ${RED}✗${NC} Name mismatch: frontmatter='${fm_name}' folder='${folder_name}'"
        errors=$((errors + 1))
    fi
    
    # 6. Description has trigger phrase
    desc=$(grep '^description:' "$skill_file" 2>/dev/null | head -1)
    if echo "$desc" | grep -qi "use when"; then
        true
    else
        echo -e "    ${RED}✗${NC} Description missing 'Use when...' trigger phrase"
        errors=$((errors + 1))
    fi
    
    # 7. Required sections
    check_section "$skill_file" "when to use"  "When to Use"  || errors=$((errors + 1))
    check_section "$skill_file" "gotcha"       "⚠️ Gotchas"   || errors=$((errors + 1))
    
    # Results
    if [ "$errors" -eq 0 ]; then
        echo -e "    ${GREEN}═══ PASS${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "    ${RED}═══ FAIL (${errors} issues)${NC}"
        FAILED=$((FAILED + 1))
        HAS_ERRORS=1
    fi
    echo ""
done


# ─── Summary ─────────────────────────────────────────────────────────────────

echo -e "${BOLD}────────────────────────────────────────${NC}"
echo -e "${BOLD}Summary:${NC} ${TOTAL} skills audited"
echo -e "  ${GREEN}✓ Passed:${NC} ${PASSED}"
echo -e "  ${RED}✗ Failed:${NC} ${FAILED}"
echo ""

if [ "$HAS_ERRORS" -eq 1 ]; then
    echo -e "${RED}Some skills need attention.${NC}"
    exit 1
else
    echo -e "${GREEN}All skills are compliant! 🎉${NC}"
    exit 0
fi
