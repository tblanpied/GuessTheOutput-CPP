#include <iostream>
#include <string>

const std::string& f() {
    std::string s = "x";
    return s;
}

int main() {
    std::cout << f() << "\n";
}
