#include <iostream>
#include <string_view>

int main() {
    std::string_view v = "abc";
    std::cout << v.size() << ' ' << v.substr(1, 1) << "\n";
}
